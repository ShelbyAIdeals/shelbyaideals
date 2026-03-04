// Usage: npx tsx scripts/publish-next.ts
// Can also: npx tsx scripts/publish-next.ts --count 3 (generate 3 articles)

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { generateArticle } from './generate-article.js';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface QueueArticle {
  id: number;
  type: 'review' | 'comparison' | 'best' | 'guide';
  status: 'pending' | 'generated' | 'published';
  title: string;
  slug: string;
  category: string;
  primaryKeyword: string;
  keywords: string[];
  tool?: string;
  tools?: string[];
  generatedDate?: string;
  publishedDate?: string;
}

interface ContentQueue {
  queue: QueueArticle[];
}

// ---------------------------------------------------------------------------
// Paths
// ---------------------------------------------------------------------------

const PROJECT_ROOT = path.resolve(path.join(__dirname, '..'));
const QUEUE_PATH = path.join(PROJECT_ROOT, 'scripts', 'content-queue.json');

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function readQueue(): ContentQueue {
  if (!fs.existsSync(QUEUE_PATH)) {
    console.error(`ERROR: Content queue not found at ${QUEUE_PATH}`);
    process.exit(1);
  }
  const raw = fs.readFileSync(QUEUE_PATH, 'utf-8');
  return JSON.parse(raw) as ContentQueue;
}

function writeQueue(queue: ContentQueue): void {
  fs.writeFileSync(QUEUE_PATH, JSON.stringify(queue, null, 2) + '\n', 'utf-8');
}

function todayISO(): string {
  return new Date().toISOString().split('T')[0];
}

function parseArgs(): { count: number } {
  const args = process.argv.slice(2);
  let count = 1;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--count' && args[i + 1]) {
      const parsed = parseInt(args[i + 1], 10);
      if (isNaN(parsed) || parsed < 1) {
        console.error('ERROR: --count must be a positive integer.');
        process.exit(1);
      }
      count = Math.min(parsed, 5); // Cap at 5
      if (parsed > 5) {
        console.warn('WARNING: --count capped at 5 to avoid excessive API usage.');
      }
    }
  }

  return { count };
}

function runCommand(label: string, command: string): boolean {
  console.log(`\nRunning: ${label}...`);
  try {
    execSync(command, {
      cwd: PROJECT_ROOT,
      stdio: 'inherit',
      timeout: 300_000, // 5 minute timeout
    });
    console.log(`${label}: Done.`);
    return true;
  } catch (err: unknown) {
    const error = err as Error;
    console.error(`ERROR: ${label} failed.`);
    console.error(error.message);
    return false;
  }
}

// ---------------------------------------------------------------------------
// Main pipeline
// ---------------------------------------------------------------------------

async function main(): Promise<void> {
  const { count } = parseArgs();

  console.log('='.repeat(60));
  console.log('  ShelbyAIDeals - Publish Pipeline');
  console.log('='.repeat(60));
  console.log(`Target: generate and publish ${count} article(s)\n`);

  // --- Find pending articles ---
  const queue = readQueue();
  const pendingArticles = queue.queue.filter((a) => a.status === 'pending');

  if (pendingArticles.length === 0) {
    console.log('No pending articles in the queue. Nothing to publish.');
    process.exit(0);
  }

  const articlesToProcess = pendingArticles.slice(0, count);
  console.log(`Found ${pendingArticles.length} pending article(s). Processing ${articlesToProcess.length}.\n`);

  // --- Generate each article ---
  const generated: QueueArticle[] = [];
  const failed: QueueArticle[] = [];

  for (const article of articlesToProcess) {
    console.log('-'.repeat(60));
    console.log(`Processing: ${article.title}`);
    console.log('-'.repeat(60));

    try {
      await generateArticle(article.id);

      // Update status to "published" with publishedDate
      // Re-read queue since generateArticle already wrote to it
      const freshQueue = readQueue();
      const freshArticle = freshQueue.queue.find((a) => a.id === article.id);
      if (freshArticle) {
        freshArticle.status = 'published';
        freshArticle.publishedDate = todayISO();
        writeQueue(freshQueue);
      }

      console.log(`Generated: ${article.title}`);
      generated.push(article);
    } catch (err: unknown) {
      const error = err as Error;
      console.error(`FAILED: ${article.title}`);
      console.error(`Reason: ${error.message}`);
      failed.push(article);
      // Continue with next article
    }
  }

  if (generated.length === 0) {
    console.error('\nAll article generations failed. Aborting pipeline.');
    process.exit(1);
  }

  // --- Post-generation steps ---
  console.log('\n' + '='.repeat(60));
  console.log('  Post-Generation Steps');
  console.log('='.repeat(60));

  // Sitemap
  runCommand('Sitemap generation', 'npx tsx scripts/generate-sitemap.ts');

  // RSS
  runCommand('RSS feed generation', 'npx tsx scripts/generate-rss.ts');

  // Build
  const buildSuccess = runCommand('Next.js build', 'npx next build');

  // --- Summary ---
  console.log('\n' + '='.repeat(60));
  console.log('  Publish Summary');
  console.log('='.repeat(60));
  console.log(`  Generated: ${generated.length}`);
  if (failed.length > 0) {
    console.log(`  Failed:    ${failed.length}`);
    for (const f of failed) {
      console.log(`    - ${f.title}`);
    }
  }
  console.log(`  Build:     ${buildSuccess ? 'Success' : 'Failed'}`);
  console.log(`\nBuild complete. ${generated.length} new article(s) published.`);

  // --- Git auto-commit ---
  if (process.env.GIT_AUTO_COMMIT === 'true') {
    console.log('\n' + '='.repeat(60));
    console.log('  Git Auto-Commit');
    console.log('='.repeat(60));

    const titles = generated.map((a) => a.title).join(', ');
    const commitMessage = `content: publish ${titles}`;

    try {
      console.log('Staging all changes...');
      execSync('git add -A', { cwd: PROJECT_ROOT, stdio: 'inherit' });

      console.log('Committing...');
      execSync(`git commit -m "${commitMessage.replace(/"/g, '\\"')}"`, {
        cwd: PROJECT_ROOT,
        stdio: 'inherit',
      });

      console.log('Pushing to remote...');
      execSync('git push', { cwd: PROJECT_ROOT, stdio: 'inherit' });

      console.log('Pushed to remote. Deploy should trigger automatically.');
    } catch (err: unknown) {
      const error = err as Error;
      console.error('ERROR: Git operations failed.');
      console.error(error.message);
      console.error('Changes are generated but NOT pushed. Please commit and push manually.');
    }
  } else {
    console.log('\nGIT_AUTO_COMMIT is not set to "true". Skipping git commit/push.');
    console.log('To auto-commit, run with: GIT_AUTO_COMMIT=true npx tsx scripts/publish-next.ts');
  }
}

main().catch((err) => {
  console.error('Unexpected error:', err);
  process.exit(1);
});
