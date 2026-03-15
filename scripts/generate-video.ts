/**
 * Generate animated explainer videos for tool reviews.
 *
 * Usage:
 *   npx tsx scripts/generate-video.ts <tool-slug>
 *   npx tsx scripts/generate-video.ts pictory-review
 *   npx tsx scripts/generate-video.ts --all
 *   npx tsx scripts/generate-video.ts pictory-review --no-voiceover
 *   npx tsx scripts/generate-video.ts pictory-review --pinterest-only
 */

import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';

dotenv.config({ path: path.resolve(import.meta.dirname || __dirname, '../.env.local') });

const CONTENT_DIR = path.resolve(import.meta.dirname || __dirname, '../src/content/reviews');
const OUTPUT_DIR = path.resolve(import.meta.dirname || __dirname, '../out/videos');
const REMOTION_ENTRY = path.resolve(import.meta.dirname || __dirname, '../remotion/Root.tsx');

interface ReviewData {
  slug: string;
  tool: string;
  toolSlug: string;
  tagline: string;
  rating: number;
  bestFor: string;
  pricing: string;
  pros: string[];
  cons: string[];
  verdict: string;
  affiliateUrl: string;
  excerpt: string;
}

function loadReview(slug: string): ReviewData | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    console.error(`Review not found: ${filePath}`);
    return null;
  }

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data } = matter(raw);

  const pricing = data.pricing?.[0]
    ? `${data.pricing[0].price}/${data.pricing[0].period}`
    : 'See pricing';

  return {
    slug,
    tool: data.tool || data.title?.replace(/ Review.*$/, '') || slug,
    toolSlug: data.toolSlug || slug.replace(/-review$/, ''),
    tagline: data.bestFor || data.excerpt?.slice(0, 60) || '',
    rating: data.rating || 4.0,
    bestFor: data.bestFor || '',
    pricing,
    pros: data.pros || [],
    cons: data.cons || [],
    verdict: data.verdict || data.excerpt || '',
    affiliateUrl: data.affiliateUrl || `https://shelby-ai.com/reviews/${slug}/`,
    excerpt: data.excerpt || '',
  };
}

async function generateVoiceover(text: string, outputPath: string): Promise<string | null> {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  const voiceId = process.env.ELEVENLABS_VOICE_ID || '21m00Tcm4TlvDq8ikWAM'; // Default: Rachel

  if (!apiKey) {
    console.log('  No ELEVENLABS_API_KEY — skipping voiceover');
    return null;
  }

  console.log('  Generating voiceover...');

  const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'xi-api-key': apiKey,
    },
    body: JSON.stringify({
      text,
      model_id: 'eleven_monolingual_v1',
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.75,
      },
    }),
  });

  if (!response.ok) {
    console.error(`  ElevenLabs API error: ${response.status} ${response.statusText}`);
    return null;
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  fs.writeFileSync(outputPath, buffer);
  console.log(`  Voiceover saved: ${outputPath} (${(buffer.length / 1024).toFixed(0)}KB)`);
  return outputPath;
}

function buildNarrationScript(review: ReviewData): string {
  const prosText = review.pros.slice(0, 3).join('. ');
  const consText = review.cons.slice(0, 2).join('. ');

  return `
${review.tool} Review.

${review.tool} is best for ${review.bestFor}. Starting at ${review.pricing}.

Here are the key highlights: ${prosText}.

On the downside: ${consText}.

Our final verdict: ${review.verdict}

For the full review with pricing details and comparisons, visit shelby-ai.com.
  `.trim();
}

async function renderVideo(
  review: ReviewData,
  compositionId: string,
  outputPath: string,
  voiceoverPath: string | null,
) {
  const { bundle } = await import('@remotion/bundler');
  const { renderMedia, selectComposition } = await import('@remotion/renderer');

  console.log('  Bundling Remotion project...');
  const bundled = await bundle({
    entryPoint: REMOTION_ENTRY,
    onProgress: (p: number) => {
      if (p === 100) console.log('  Bundle complete.');
    },
  });

  const inputProps = {
    toolName: review.tool,
    toolSlug: review.toolSlug,
    tagline: review.bestFor || review.excerpt.slice(0, 60),
    rating: review.rating,
    bestFor: review.bestFor,
    pricing: review.pricing,
    pros: review.pros,
    cons: review.cons,
    verdict: review.verdict,
    affiliateUrl: review.affiliateUrl,
    screenshots: [],
    voiceoverUrl: voiceoverPath ? `file://${voiceoverPath}` : undefined,
    vertical: compositionId === 'ToolReviewPinterest',
  };

  console.log(`  Selecting composition: ${compositionId}...`);
  const composition = await selectComposition({
    serveUrl: bundled,
    id: compositionId,
    inputProps,
  });

  console.log(`  Rendering ${composition.width}x${composition.height} @ ${composition.fps}fps...`);
  await renderMedia({
    composition,
    serveUrl: bundled,
    codec: 'h264',
    outputLocation: outputPath,
    inputProps,
    onProgress: ({ progress }: { progress: number }) => {
      if (Math.round(progress * 100) % 25 === 0) {
        process.stdout.write(`\r  Rendering: ${Math.round(progress * 100)}%`);
      }
    },
  });

  console.log(`\n  Video saved: ${outputPath}`);
}

async function processReview(slug: string, options: { noVoiceover?: boolean; pinterestOnly?: boolean }) {
  console.log(`\n========================================`);
  console.log(`  Processing: ${slug}`);
  console.log(`========================================`);

  const review = loadReview(slug);
  if (!review) return;

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  // Generate voiceover
  let voiceoverPath: string | null = null;
  if (!options.noVoiceover) {
    const narration = buildNarrationScript(review);
    console.log(`  Narration script (${narration.length} chars):`);
    console.log(`  "${narration.slice(0, 100)}..."`);
    voiceoverPath = await generateVoiceover(
      narration,
      path.join(OUTPUT_DIR, `${slug}-voiceover.mp3`),
    );
  }

  // Render landscape video (16:9)
  if (!options.pinterestOnly) {
    const outputPath = path.join(OUTPUT_DIR, `${slug}.mp4`);
    await renderVideo(review, 'ToolReview', outputPath, voiceoverPath);
  }

  // Render Pinterest vertical video (9:16)
  const pinterestPath = path.join(OUTPUT_DIR, `${slug}-pinterest.mp4`);
  await renderVideo(review, 'ToolReviewPinterest', pinterestPath, voiceoverPath);

  console.log(`\n  Done! Files in ${OUTPUT_DIR}/`);
}

// Main
const args = process.argv.slice(2);
const slug = args.find(a => !a.startsWith('--'));
const noVoiceover = args.includes('--no-voiceover');
const pinterestOnly = args.includes('--pinterest-only');

async function main() {
  if (!slug && !args.includes('--all')) {
    console.log('Usage: npx tsx scripts/generate-video.ts <review-slug>');
    console.log('       npx tsx scripts/generate-video.ts pictory-review');
    console.log('       npx tsx scripts/generate-video.ts --all');
    console.log('       npx tsx scripts/generate-video.ts pictory-review --no-voiceover');
    console.log('       npx tsx scripts/generate-video.ts pictory-review --pinterest-only');
    process.exit(1);
  }

  if (args.includes('--all')) {
    const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.mdx'));
    console.log(`Found ${files.length} reviews. Generating videos...`);
    for (const file of files) {
      await processReview(file.replace('.mdx', ''), { noVoiceover, pinterestOnly });
    }
  } else if (slug) {
    await processReview(slug, { noVoiceover, pinterestOnly });
  }
}

main();
