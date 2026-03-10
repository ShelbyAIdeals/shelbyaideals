// Usage: npx tsx scripts/generate-batch.ts --count 29
// Generates multiple articles without the 5-article cap.
// Does NOT run sitemap/RSS/build — run those separately after.

import fs from 'fs';
import path from 'path';

// Load .env.local if OPENAI_API_KEY not already set
function loadEnvLocal(): void {
  if (process.env.OPENAI_API_KEY) return;
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

import { generateArticle } from './generate-article.js';

interface QueueArticle {
  id: number;
  type: 'review' | 'comparison' | 'best' | 'guide';
  status: 'pending' | 'generated' | 'published';
  title: string;
  slug: string;
  publishedDate?: string;
  [key: string]: unknown;
}

interface ContentQueue {
  queue: QueueArticle[];
}

const PROJECT_ROOT = path.resolve(path.join(__dirname, '..'));
const QUEUE_PATH = path.join(PROJECT_ROOT, 'scripts', 'content-queue.json');

function readQueue(): ContentQueue {
  const raw = fs.readFileSync(QUEUE_PATH, 'utf-8');
  return JSON.parse(raw) as ContentQueue;
}

function writeQueue(queue: ContentQueue): void {
  fs.writeFileSync(QUEUE_PATH, JSON.stringify(queue, null, 2) + '\n', 'utf-8');
}

function todayISO(): string {
  return new Date().toISOString().split('T')[0];
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
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
      count = parsed; // No cap
    }
  }
  return { count };
}

async function main(): Promise<void> {
  const { count } = parseArgs();

  if (!process.env.OPENAI_API_KEY) {
    console.error('ERROR: OPENAI_API_KEY not set.');
    console.error('Run with: OPENAI_API_KEY=sk-... npx tsx scripts/generate-batch.ts --count N');
    process.exit(1);
  }

  console.log('='.repeat(60));
  console.log('  ShelbyAIDeals - Batch Generator (no cap)');
  console.log('='.repeat(60));

  const queue = readQueue();
  const pending = queue.queue.filter((a) => a.status === 'pending');

  if (pending.length === 0) {
    console.log('No pending articles. Nothing to generate.');
    process.exit(0);
  }

  const toProcess = pending.slice(0, count);
  console.log(`Found ${pending.length} pending. Will generate ${toProcess.length}.\n`);

  const generated: QueueArticle[] = [];
  const failed: { article: QueueArticle; error: string }[] = [];
  const startTime = Date.now();

  for (let i = 0; i < toProcess.length; i++) {
    const article = toProcess[i];
    const progress = `[${i + 1}/${toProcess.length}]`;

    console.log('-'.repeat(60));
    console.log(`${progress} ${article.title}`);
    console.log(`  Type: ${article.type} | ID: ${article.id} | Slug: ${article.slug}`);
    console.log('-'.repeat(60));

    try {
      await generateArticle(article.id);

      // Mark as published
      const freshQueue = readQueue();
      const freshArticle = freshQueue.queue.find((a) => a.id === article.id);
      if (freshArticle) {
        freshArticle.status = 'published';
        freshArticle.publishedDate = todayISO();
        writeQueue(freshQueue);
      }

      generated.push(article);
      console.log(`${progress} SUCCESS: ${article.slug}\n`);
    } catch (err: unknown) {
      const error = err as Error;
      failed.push({ article, error: error.message });
      console.error(`${progress} FAILED: ${article.slug}`);
      console.error(`  Reason: ${error.message}\n`);
    }

    // Rate limit: 2s delay between API calls (skip after last)
    if (i < toProcess.length - 1) {
      await sleep(2000);
    }
  }

  // Summary
  const elapsed = ((Date.now() - startTime) / 1000 / 60).toFixed(1);

  console.log('\n' + '='.repeat(60));
  console.log('  Batch Generation Summary');
  console.log('='.repeat(60));
  console.log(`  Total attempted: ${toProcess.length}`);
  console.log(`  Generated:       ${generated.length}`);
  console.log(`  Failed:          ${failed.length}`);
  console.log(`  Time:            ${elapsed} minutes`);

  if (failed.length > 0) {
    console.log('\n  Failed articles:');
    for (const { article, error } of failed) {
      console.log(`    - [ID ${article.id}] ${article.title}`);
      console.log(`      Error: ${error}`);
    }
  }

  if (generated.length > 0) {
    console.log('\n  Generated articles:');
    for (const a of generated) {
      console.log(`    - [ID ${a.id}] ${a.slug}`);
    }
  }

  console.log('\n  Next steps:');
  console.log('    1. npx tsx scripts/quality-scan.ts');
  console.log('    2. Fix any FAIL articles');
  console.log('    3. npx tsx scripts/generate-sitemap.ts');
  console.log('    4. npx tsx scripts/generate-rss.ts');
  console.log('    5. npx next build');
  console.log('    6. git add & commit & push');

  if (failed.length > 0) {
    console.log(`\n  To retry failed articles individually:`);
    for (const { article } of failed) {
      console.log(`    OPENAI_API_KEY=... npx tsx scripts/generate-article.ts ${article.id}`);
    }
  }
}

main().catch((err) => {
  console.error('Unexpected error:', err);
  process.exit(1);
});
