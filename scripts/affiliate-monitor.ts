// Usage: npx tsx scripts/affiliate-monitor.ts              # Check + auto-update
//        npx tsx scripts/affiliate-monitor.ts --dry-run    # Check only, no file changes
//        npx tsx scripts/affiliate-monitor.ts --json       # Output JSON

import fs from 'fs';
import path from 'path';

// ---------------------------------------------------------------------------
// Load .env.local
// ---------------------------------------------------------------------------
function loadEnvLocal(): void {
  const envPath = path.resolve(path.join(__dirname, '..', '.env.local'));
  if (!fs.existsSync(envPath)) return;
  const lines = fs.readFileSync(envPath, 'utf-8').split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIndex = trimmed.indexOf('=');
    if (eqIndex === -1) continue;
    const key = trimmed.slice(0, eqIndex).trim();
    const val = trimmed.slice(eqIndex + 1).trim();
    if (!process.env[key]) process.env[key] = val;
  }
}
loadEnvLocal();

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------
const PROJECT_ROOT = path.resolve(path.join(__dirname, '..'));
const AFFILIATE_TS_PATH = path.join(PROJECT_ROOT, 'src', 'lib', 'affiliate.ts');
const CONTENT_DIR = path.join(PROJECT_ROOT, 'src', 'content');

const DRY_RUN = process.argv.includes('--dry-run');
const JSON_OUTPUT = process.argv.includes('--json');

// Map API company names → our affiliate.ts slugs
const COMPANY_SLUG_MAP: Record<string, string> = {
  // PartnerStack
  'Eleven Labs Inc.': 'elevenlabs',
  'ElevenLabs': 'elevenlabs',
  'ClickUp': 'clickup',
  'Surfer': 'surfer',
  'Surfer SEO': 'surfer',
  'Synthesia': 'synthesia',
  'Notion': 'notion',
  'Frase': 'frase',
  // Impact.com
  'Semrush': 'semrush',
  'SEMrush': 'semrush',
  'AppSumo': 'appsumo',
  'Grammarly': 'grammarly',
  'Canva': 'canva',
  'HubSpot': 'hubspot',
  'Descript': 'descript',
  'Pictory': 'pictory',
  'Mangools': 'mangools',
  'Writesonic': 'writesonic',
  'Jasper': 'jasper',
  'Jasper AI': 'jasper',
};

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface Partnership {
  platform: 'partnerstack' | 'impact';
  companyName: string;
  slug: string | null;
  status: string;
  trackingUrl: string | null;
  destination: string | null;
  commission: string | null;
}

interface AffiliateEntry {
  name: string;
  url: string;
  commission: string;
  status: 'active' | 'pending' | 'unavailable';
}

interface UpdateAction {
  slug: string;
  field: string;
  oldValue: string;
  newValue: string;
}

// ---------------------------------------------------------------------------
// PartnerStack API
// ---------------------------------------------------------------------------
async function fetchPartnerStack(): Promise<Partnership[]> {
  const apiKey = process.env.PARTNERSTACK_API_KEY;
  if (!apiKey) {
    console.error('  PARTNERSTACK_API_KEY not set — skipping PartnerStack');
    return [];
  }

  try {
    const res = await fetch('https://api.partnerstack.com/api/v2/partnerships', {
      headers: { Authorization: `Bearer ${apiKey}` },
    });

    if (!res.ok) {
      console.error(`  PartnerStack API error: ${res.status} ${res.statusText}`);
      return [];
    }

    const json = await res.json();
    const items = json?.data?.items ?? [];

    return items.map((item: any) => ({
      platform: 'partnerstack' as const,
      companyName: item.company?.name ?? 'Unknown',
      slug: COMPANY_SLUG_MAP[item.company?.name] ?? null,
      status: item.status ?? 'unknown',
      trackingUrl: item.link?.url ?? null,
      destination: item.link?.destination ?? null,
      commission: item.offers?.description ?? null,
    }));
  } catch (err: any) {
    console.error(`  PartnerStack fetch failed: ${err.message}`);
    return [];
  }
}

// ---------------------------------------------------------------------------
// Impact.com API
// ---------------------------------------------------------------------------
async function fetchImpact(): Promise<Partnership[]> {
  const sid = process.env.IMPACT_ACCOUNT_SID;
  const token = process.env.IMPACT_AUTH_TOKEN;
  if (!sid || !token) {
    console.error('  IMPACT_ACCOUNT_SID or IMPACT_AUTH_TOKEN not set — skipping Impact.com');
    return [];
  }

  const partnerships: Partnership[] = [];
  const authHeader = 'Basic ' + Buffer.from(`${sid}:${token}`).toString('base64');

  try {
    // Fetch campaigns
    const campaignsRes = await fetch(
      `https://api.impact.com/Mediapartners/${sid}/Campaigns`,
      { headers: { Accept: 'application/json', Authorization: authHeader } },
    );

    if (!campaignsRes.ok) {
      console.error(`  Impact.com Campaigns API error: ${campaignsRes.status} ${campaignsRes.statusText}`);
      return [];
    }

    const campaignsJson = await campaignsRes.json();
    const campaigns = campaignsJson?.Campaigns ?? [];

    for (const campaign of campaigns) {
      const name = campaign.CampaignName ?? campaign.Name ?? 'Unknown';
      const status = campaign.CampaignStatus ?? campaign.Status ?? 'unknown';
      let trackingUrl: string | null = null;

      // If campaign is active, try to get tracking link
      if (status.toLowerCase() === 'active') {
        try {
          const adsRes = await fetch(
            `https://api.impact.com/Mediapartners/${sid}/Ads?CampaignId=${campaign.CampaignId ?? campaign.Id}`,
            { headers: { Accept: 'application/json', Authorization: authHeader } },
          );
          if (adsRes.ok) {
            const adsJson = await adsRes.json();
            const ads = adsJson?.Ads ?? [];
            if (ads.length > 0) {
              trackingUrl = ads[0].TrackingLink ?? ads[0].ClickUrl ?? null;
            }
          }
        } catch {
          // Ads fetch failed — continue without tracking link
        }

        // Fallback: try TrackingLink on campaign itself
        if (!trackingUrl) {
          trackingUrl = campaign.TrackingLink ?? null;
        }
      }

      partnerships.push({
        platform: 'impact',
        companyName: name,
        slug: COMPANY_SLUG_MAP[name] ?? null,
        status: status.toLowerCase(),
        trackingUrl,
        destination: campaign.CampaignUrl ?? null,
        commission: campaign.CommissionType ?? null,
      });
    }
  } catch (err: any) {
    console.error(`  Impact.com fetch failed: ${err.message}`);
  }

  return partnerships;
}

// ---------------------------------------------------------------------------
// Read current affiliate.ts
// ---------------------------------------------------------------------------
function readAffiliateTs(): Record<string, AffiliateEntry> {
  const content = fs.readFileSync(AFFILIATE_TS_PATH, 'utf-8');
  const entries: Record<string, AffiliateEntry> = {};

  // Parse each entry block: key: { name: '...', url: '...', commission: '...', status: '...' }
  const entryRegex = /['"]?(\w[\w-]*)['"]?\s*:\s*\{[^}]*name:\s*'([^']*)'[^}]*url:\s*'([^']*)'[^}]*commission:\s*'([^']*)'[^}]*status:\s*'([^']*)'/g;
  let match;
  while ((match = entryRegex.exec(content)) !== null) {
    entries[match[1]] = {
      name: match[2],
      url: match[3],
      commission: match[4],
      status: match[5] as AffiliateEntry['status'],
    };
  }

  return entries;
}

// ---------------------------------------------------------------------------
// Update affiliate.ts
// ---------------------------------------------------------------------------
function updateAffiliateTs(actions: UpdateAction[]): void {
  if (actions.length === 0) return;

  let content = fs.readFileSync(AFFILIATE_TS_PATH, 'utf-8');

  for (const action of actions) {
    if (action.field === 'status') {
      // Find the block for this slug and replace status
      const blockRegex = new RegExp(
        `(['"]?${action.slug.replace('-', "[-']?")}['"]?\\s*:\\s*\\{[^}]*)(status:\\s*'${action.oldValue}')`,
      );
      content = content.replace(blockRegex, `$1status: '${action.newValue}'`);
    } else if (action.field === 'url') {
      // Find the block for this slug and replace url
      const escapedOld = action.oldValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const blockRegex = new RegExp(
        `(['"]?${action.slug.replace('-', "[-']?")}['"]?\\s*:\\s*\\{[^}]*)(url:\\s*'${escapedOld}')`,
      );
      content = content.replace(blockRegex, `$1url: '${action.newValue}'`);
    }
  }

  fs.writeFileSync(AFFILIATE_TS_PATH, content, 'utf-8');
}

// ---------------------------------------------------------------------------
// Update MDX files when tracking URL changes
// ---------------------------------------------------------------------------
function updateMdxFiles(oldUrl: string, newUrl: string): string[] {
  const updatedFiles: string[] = [];
  const subdirs = ['reviews', 'comparisons', 'best', 'guides'];

  for (const subdir of subdirs) {
    const dir = path.join(CONTENT_DIR, subdir);
    if (!fs.existsSync(dir)) continue;

    const files = fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'));
    for (const file of files) {
      const filePath = path.join(dir, file);
      const content = fs.readFileSync(filePath, 'utf-8');

      if (content.includes(oldUrl)) {
        const updated = content.replaceAll(oldUrl, newUrl);
        fs.writeFileSync(filePath, updated, 'utf-8');
        updatedFiles.push(`${subdir}/${file}`);
      }
    }
  }

  return updatedFiles;
}

// ---------------------------------------------------------------------------
// Status icons
// ---------------------------------------------------------------------------
function statusIcon(status: string): string {
  if (status === 'active') return '\u2713'; // checkmark
  if (status === 'unavailable') return '\u2717'; // x
  return '\u231B'; // hourglass
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main(): Promise<void> {
  if (!JSON_OUTPUT) {
    console.log('='.repeat(60));
    console.log('  Affiliate Monitor \u2014 Shelby AI');
    console.log('='.repeat(60));
    if (DRY_RUN) console.log('  (DRY RUN \u2014 no files will be modified)\n');
  }

  // Fetch from both platforms
  if (!JSON_OUTPUT) console.log('\nFetching PartnerStack...');
  const psPartnerships = await fetchPartnerStack();

  if (!JSON_OUTPUT) console.log('Fetching Impact.com...');
  const impactPartnerships = await fetchImpact();

  const allPartnerships = [...psPartnerships, ...impactPartnerships];

  // Read current affiliate.ts
  const currentAffiliates = readAffiliateTs();

  // JSON output mode
  if (JSON_OUTPUT) {
    const output = {
      partnerstack: psPartnerships,
      impact: impactPartnerships,
      affiliateTs: currentAffiliates,
      timestamp: new Date().toISOString(),
    };
    console.log(JSON.stringify(output, null, 2));
    return;
  }

  // Print PartnerStack status
  console.log('\n' + '-'.repeat(60));
  console.log('PARTNERSTACK:');
  if (psPartnerships.length === 0) {
    console.log('  (no partnerships found)');
  } else {
    for (const p of psPartnerships) {
      const icon = statusIcon(p.status === 'application-pending' ? 'pending' : p.status);
      const slug = p.slug ? `(${p.slug})` : '(unmapped)';
      const url = p.trackingUrl ?? '\u2014';
      console.log(`  ${icon} ${p.companyName.padEnd(22)} ${p.status.padEnd(22)} ${url}`);
      if (!p.slug) {
        console.log(`    \u26A0 Company "${p.companyName}" not in COMPANY_SLUG_MAP \u2014 add mapping`);
      }
    }
  }

  // Print Impact.com status
  console.log('\nIMPACT.COM:');
  if (impactPartnerships.length === 0) {
    console.log('  (no campaigns yet)');
  } else {
    for (const p of impactPartnerships) {
      const icon = statusIcon(p.status);
      const slug = p.slug ? `(${p.slug})` : '(unmapped)';
      const url = p.trackingUrl ?? '\u2014';
      console.log(`  ${icon} ${p.companyName.padEnd(22)} ${p.status.padEnd(22)} ${url}`);
      if (!p.slug) {
        console.log(`    \u26A0 Company "${p.companyName}" not in COMPANY_SLUG_MAP \u2014 add mapping`);
      }
    }
  }

  // Print affiliate.ts status
  console.log('\n' + '-'.repeat(60));
  console.log('AFFILIATE.TS:');
  for (const [slug, entry] of Object.entries(currentAffiliates)) {
    const icon = statusIcon(entry.status);
    console.log(`  ${icon} ${slug.padEnd(18)} ${entry.status.padEnd(14)} ${entry.url}`);
  }

  // Detect new approvals and build update actions
  const actions: UpdateAction[] = [];
  const mdxUpdates: Array<{ oldUrl: string; newUrl: string; slug: string }> = [];
  let newApprovals = 0;

  for (const p of allPartnerships) {
    if (!p.slug) continue;

    const isActive =
      p.status === 'active' ||
      p.status === 'approved' ||
      p.status === 'live';

    if (!isActive) continue;

    const current = currentAffiliates[p.slug];

    if (current && current.status !== 'active') {
      // Status change: pending/unavailable → active
      actions.push({
        slug: p.slug,
        field: 'status',
        oldValue: current.status,
        newValue: 'active',
      });
      newApprovals++;

      // URL change: update to tracking link
      if (p.trackingUrl && p.trackingUrl !== current.url) {
        actions.push({
          slug: p.slug,
          field: 'url',
          oldValue: current.url,
          newValue: p.trackingUrl,
        });
        mdxUpdates.push({
          oldUrl: current.url,
          newUrl: p.trackingUrl,
          slug: p.slug,
        });
      }
    } else if (!current && p.trackingUrl) {
      // New tool not in affiliate.ts — log it
      console.log(`\n  \u2728 NEW: ${p.companyName} (${p.slug}) is active but not in affiliate.ts`);
      console.log(`     Tracking URL: ${p.trackingUrl}`);
      console.log(`     Add manually or re-run to auto-add in future version`);
      newApprovals++;
    }
  }

  // Apply updates
  console.log('\n' + '='.repeat(60));
  if (newApprovals === 0) {
    console.log(`NEW APPROVALS DETECTED: 0`);
    console.log('All statuses match. Nothing to update.');
  } else {
    console.log(`NEW APPROVALS DETECTED: ${newApprovals}`);
    console.log('');

    for (const action of actions) {
      console.log(`  ${action.slug}: ${action.field} "${action.oldValue}" \u2192 "${action.newValue}"`);
    }

    if (!DRY_RUN) {
      // Update affiliate.ts
      console.log('\nUpdating affiliate.ts...');
      updateAffiliateTs(actions);
      console.log('  \u2713 affiliate.ts updated');

      // Update MDX files
      for (const update of mdxUpdates) {
        console.log(`\nUpdating MDX files for ${update.slug}...`);
        console.log(`  Old URL: ${update.oldUrl}`);
        console.log(`  New URL: ${update.newUrl}`);
        const files = updateMdxFiles(update.oldUrl, update.newUrl);
        if (files.length === 0) {
          console.log('  No MDX files contained the old URL');
        } else {
          console.log(`  \u2713 Updated ${files.length} files:`);
          for (const f of files) {
            console.log(`    - ${f}`);
          }
        }
      }
    } else {
      console.log('\n(DRY RUN \u2014 no changes written)');
    }
  }

  console.log('='.repeat(60));
}

main().catch((err) => {
  console.error('Fatal error:', err.message);
  process.exit(1);
});
