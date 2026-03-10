// Usage: npx tsx scripts/generate-article.ts [article-id]
// Or: npx tsx scripts/generate-article.ts --next (picks next pending from queue)

import OpenAI from 'openai';
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

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface PricingTier {
  plan: string;
  price: string;
  period: string;
  features: string[];
  highlighted?: boolean;
}

interface ToolData {
  name: string;
  website: string;
  pricing: PricingTier[];
  category: string;
  bestFor: string;
  competitors: string[];
}

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
  toolData?: ToolData;
  generatedDate?: string;
  publishedDate?: string;
}

interface ContentQueue {
  queue: QueueArticle[];
}

type PromptResult = string | { system: string; user: string };
type PromptBuilder = (article: QueueArticle) => PromptResult;

// ---------------------------------------------------------------------------
// Paths
// ---------------------------------------------------------------------------

const PROJECT_ROOT = path.resolve(path.join(__dirname, '..'));
const QUEUE_PATH = path.join(PROJECT_ROOT, 'scripts', 'content-queue.json');
const CONTENT_DIR = path.join(PROJECT_ROOT, 'src', 'content');

// Map article type -> content subdirectory
const TYPE_DIR_MAP: Record<string, string> = {
  review: 'reviews',
  comparison: 'comparisons',
  best: 'best',
  guide: 'guides',
};

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

function stripCodeFences(content: string): string {
  let cleaned = content.trim();
  // Strip opening code fence (```yaml, ```mdx, ```, etc.)
  cleaned = cleaned.replace(/^```\w*\s*\n/, '');
  // Strip closing code fence
  cleaned = cleaned.replace(/\n```\s*$/, '');
  return cleaned.trim();
}

function todayISO(): string {
  return new Date().toISOString().split('T')[0];
}

// ---------------------------------------------------------------------------
// Prompt builder loader
// ---------------------------------------------------------------------------

async function loadPromptBuilder(type: string): Promise<PromptBuilder> {
  const promptMap: Record<string, { path: string; exportName: string }> = {
    review: { path: './prompts/review', exportName: 'buildReviewPrompt' },
    comparison: { path: './prompts/comparison', exportName: 'buildComparisonPrompt' },
    best: { path: './prompts/best-of', exportName: 'buildBestOfPrompt' },
    guide: { path: './prompts/guide', exportName: 'buildGuidePrompt' },
  };

  const entry = promptMap[type];
  if (!entry) {
    console.error(`ERROR: Unknown article type "${type}". Expected: review, comparison, best, guide`);
    process.exit(1);
  }

  // Try .ts first (source), then .js (compiled)
  const tsPath = path.resolve(__dirname, entry.path + '.ts');
  const jsPath = path.resolve(__dirname, entry.path + '.js');
  const fullPath = fs.existsSync(tsPath) ? tsPath : jsPath;

  if (!fs.existsSync(fullPath)) {
    console.error(`ERROR: Prompt builder not found at ${tsPath} or ${jsPath}`);
    console.error(`Make sure the prompt modules exist in scripts/prompts/`);
    process.exit(1);
  }

  const mod = await import(fullPath);
  const builder: PromptBuilder = mod[entry.exportName] || mod.buildPrompt || mod.default;

  if (typeof builder !== 'function') {
    console.error(`ERROR: Prompt module "${fullPath}" does not export ${entry.exportName}, buildPrompt, or default function`);
    process.exit(1);
  }

  return builder;
}

// ---------------------------------------------------------------------------
// Article generation
// ---------------------------------------------------------------------------

export async function generateArticle(articleId?: number): Promise<QueueArticle> {
  // --- Validate API key ---
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error('ERROR: OPENAI_API_KEY environment variable is not set.');
    console.error('Set it with: export OPENAI_API_KEY="your-key-here"');
    process.exit(1);
  }

  // --- Read queue ---
  const queue = readQueue();
  let article: QueueArticle | undefined;

  if (articleId !== undefined) {
    article = queue.queue.find((a) => a.id === articleId);
    if (!article) {
      console.error(`ERROR: Article with id ${articleId} not found in content queue.`);
      process.exit(1);
    }
  } else {
    // Pick next pending
    article = queue.queue.find((a) => a.status === 'pending');
    if (!article) {
      console.error('ERROR: No pending articles in the content queue.');
      process.exit(1);
    }
  }

  if (article.status === 'generated' || article.status === 'published') {
    console.warn(`WARNING: Article "${article.title}" already has status "${article.status}". Regenerating anyway.`);
  }

  console.log(`\n--- Generating Article ---`);
  console.log(`ID:       ${article.id}`);
  console.log(`Type:     ${article.type}`);
  console.log(`Title:    ${article.title}`);
  console.log(`Slug:     ${article.slug}`);
  console.log(`Category: ${article.category}`);
  console.log('');

  // --- Load prompt builder ---
  console.log(`Loading prompt builder for type "${article.type}"...`);
  const buildPrompt = await loadPromptBuilder(article.type);
  const promptResult = buildPrompt(article);

  // Build messages array — prompt builders return either a string or { system, user }
  const messages: Array<{ role: 'system' | 'user'; content: string }> = [];
  if (typeof promptResult === 'string') {
    messages.push({ role: 'user', content: promptResult });
  } else {
    messages.push({ role: 'system', content: promptResult.system });
    messages.push({ role: 'user', content: promptResult.user });
  }

  // --- Call OpenAI API ---
  console.log('Calling OpenAI API (gpt-4o)...');
  const client = new OpenAI({ apiKey });

  let responseText: string;
  try {
    const completion = await client.chat.completions.create({
      model: 'gpt-4o',
      max_tokens: 8000,
      temperature: 0.7,
      messages,
    });

    const choice = completion.choices[0];
    if (!choice?.message?.content) {
      console.error('ERROR: OpenAI API returned no text content.');
      process.exit(1);
    }
    responseText = choice.message.content;
    console.log(`Received response (${responseText.length} chars, ${completion.usage?.completion_tokens ?? '?'} tokens)`);
  } catch (err: unknown) {
    const error = err as Error & { status?: number; message: string };
    console.error(`ERROR: OpenAI API call failed.`);
    if (error.status) {
      console.error(`Status: ${error.status}`);
    }
    console.error(`Message: ${error.message}`);
    process.exit(1);
  }

  // --- Process response ---
  const mdxContent = stripCodeFences(responseText);

  // --- Determine output path ---
  const dirName = TYPE_DIR_MAP[article.type];
  if (!dirName) {
    console.error(`ERROR: No content directory mapping for type "${article.type}"`);
    process.exit(1);
  }

  const outputDir = path.join(CONTENT_DIR, dirName);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
    console.log(`Created directory: ${outputDir}`);
  }

  const outputPath = path.join(outputDir, `${article.slug}.mdx`);
  fs.writeFileSync(outputPath, mdxContent, 'utf-8');
  console.log(`Written: ${outputPath}`);

  // --- Update queue ---
  const updatedArticle = queue.queue.find((a) => a.id === article!.id)!;
  updatedArticle.status = 'generated';
  updatedArticle.generatedDate = todayISO();
  writeQueue(queue);
  console.log(`Queue updated: article ${article.id} -> status "generated"`);

  console.log(`\nArticle generation complete: "${article.title}"\n`);
  return updatedArticle;
}

// ---------------------------------------------------------------------------
// CLI entry point
// ---------------------------------------------------------------------------

async function main(): Promise<void> {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error('Usage: npx tsx scripts/generate-article.ts [article-id]');
    console.error('       npx tsx scripts/generate-article.ts --next');
    process.exit(1);
  }

  if (args[0] === '--next') {
    await generateArticle();
  } else {
    const id = parseInt(args[0], 10);
    if (isNaN(id)) {
      console.error(`ERROR: Invalid article ID "${args[0]}". Must be a number or --next.`);
      process.exit(1);
    }
    await generateArticle(id);
  }
}

// Only run main() if this script is executed directly (not imported)
const isDirectRun = process.argv[1] && path.resolve(process.argv[1]) === path.resolve(__filename);
if (isDirectRun) {
  main().catch((err) => {
    console.error('Unexpected error:', err);
    process.exit(1);
  });
}
