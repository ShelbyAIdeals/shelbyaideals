// Usage: npx tsx scripts/social-post.ts [article-id]
// Or: npx tsx scripts/social-post.ts --latest (posts for most recently published)

import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';

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
  publishedDate?: string;
}

interface ContentQueue {
  queue: QueueArticle[];
}

interface SocialDrafts {
  articleId: number;
  articleTitle: string;
  articleUrl: string;
  generatedAt: string;
  twitter: {
    text: string;
    charCount: number;
  };
  linkedin: {
    text: string;
  };
  reddit: {
    title: string;
    body: string;
    suggestedSubreddits: string[];
  };
  posted: {
    twitter: boolean;
    linkedin: boolean;
  };
}

// ---------------------------------------------------------------------------
// Paths & Config
// ---------------------------------------------------------------------------

const PROJECT_ROOT = path.resolve(path.join(__dirname, '..'));
const QUEUE_PATH = path.join(PROJECT_ROOT, 'scripts', 'content-queue.json');
const DRAFTS_DIR = path.join(PROJECT_ROOT, 'scripts', 'social-drafts');
const SITE_URL = process.env.SITE_URL || 'https://www.shelby-ai.com';

// Map article type -> URL path segment
const TYPE_URL_MAP: Record<string, string> = {
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

function buildArticleUrl(article: QueueArticle): string {
  const urlSegment = TYPE_URL_MAP[article.type] || article.type;
  return `${SITE_URL}/${urlSegment}/${article.slug}`;
}

function ensureDraftsDir(): void {
  if (!fs.existsSync(DRAFTS_DIR)) {
    fs.mkdirSync(DRAFTS_DIR, { recursive: true });
    console.log(`Created social drafts directory: ${DRAFTS_DIR}`);
  }
}

// ---------------------------------------------------------------------------
// Social content generation via OpenAI
// ---------------------------------------------------------------------------

async function generateSocialContent(article: QueueArticle, articleUrl: string): Promise<{
  twitter: string;
  linkedin: string;
  redditTitle: string;
  redditBody: string;
  suggestedSubreddits: string[];
}> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error('ERROR: OPENAI_API_KEY environment variable is not set.');
    console.error('Set it with: export OPENAI_API_KEY="your-key-here"');
    process.exit(1);
  }

  const toolContext = article.tool
    ? `Tool being reviewed: ${article.tool}`
    : article.tools
      ? `Tools compared: ${article.tools.join(', ')}`
      : '';

  const prompt = `Generate social media posts for promoting this article. The posts should feel genuine, not spammy. Use a conversational, knowledgeable tone.

Article Details:
- Title: ${article.title}
- Type: ${article.type}
- Category: ${article.category}
- Primary Keyword: ${article.primaryKeyword}
- Keywords: ${article.keywords.join(', ')}
${toolContext ? `- ${toolContext}` : ''}
- Article URL: ${articleUrl}

Generate exactly 3 social media posts in the following JSON format (and ONLY this JSON, no other text):

{
  "twitter": "Your tweet here (MUST be 280 characters or less including the URL placeholder [LINK]). Make it punchy with a hook. Include [LINK] where the URL should go.",
  "linkedin": "Your LinkedIn post here (2-3 paragraphs, professional but not boring). Include [LINK] where the URL should go. Use line breaks between paragraphs.",
  "redditTitle": "An engaging Reddit post title (not clickbaity, genuinely useful)",
  "redditBody": "Reddit post body (informative, value-first, include [LINK] naturally). Reddit hates obvious self-promotion, so lead with value.",
  "suggestedSubreddits": ["subreddit1", "subreddit2", "subreddit3"]
}

Important:
- Twitter: Must be under 280 chars total (including [LINK] placeholder). Hook the reader.
- LinkedIn: Professional, include personal insight or a takeaway. 2-3 short paragraphs.
- Reddit: Lead with value, not promotion. Reddit users hate marketing-speak.
- Use [LINK] as a placeholder for the article URL in all posts.
- Return ONLY valid JSON, no markdown fences, no extra text.`;

  console.log('Calling OpenAI API for social content generation...');
  const client = new OpenAI({ apiKey });

  const completion = await client.chat.completions.create({
    model: 'gpt-4o',
    max_tokens: 2000,
    temperature: 0.7,
    messages: [{ role: 'user', content: prompt }],
  });

  const responseText = completion.choices[0]?.message?.content?.trim();
  if (!responseText) {
    throw new Error('OpenAI API returned no text content for social posts.');
  }

  // Strip any markdown code fences
  let cleaned = responseText;
  const fenceMatch = cleaned.match(/^```(?:json)?\s*\n([\s\S]*?)\n```\s*$/);
  if (fenceMatch) {
    cleaned = fenceMatch[1];
  }

  try {
    const parsed = JSON.parse(cleaned);
    return {
      twitter: parsed.twitter || '',
      linkedin: parsed.linkedin || '',
      redditTitle: parsed.redditTitle || '',
      redditBody: parsed.redditBody || '',
      suggestedSubreddits: parsed.suggestedSubreddits || [],
    };
  } catch {
    throw new Error(`Failed to parse OpenAI social content response as JSON:\n${cleaned.slice(0, 500)}`);
  }
}

// ---------------------------------------------------------------------------
// Social posting
// ---------------------------------------------------------------------------

async function postToTwitter(text: string, articleUrl: string): Promise<boolean> {
  const token = process.env.TWITTER_BEARER_TOKEN;
  if (!token) return false;

  const tweetText = text.replace(/\[LINK\]/g, articleUrl);
  console.log('\nPosting to Twitter/X...');

  try {
    const response = await fetch('https://api.twitter.com/2/tweets', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: tweetText }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`Twitter API error (${response.status}): ${errorBody}`);
      return false;
    }

    const data = await response.json();
    console.log(`Tweet posted successfully. Tweet ID: ${(data as { data?: { id?: string } }).data?.id || 'unknown'}`);
    return true;
  } catch (err: unknown) {
    const error = err as Error;
    console.error(`Twitter posting failed: ${error.message}`);
    return false;
  }
}

async function postToLinkedIn(text: string, articleUrl: string): Promise<boolean> {
  const token = process.env.LINKEDIN_ACCESS_TOKEN;
  const authorUrn = process.env.LINKEDIN_AUTHOR_URN;
  if (!token || !authorUrn) {
    if (token && !authorUrn) {
      console.warn('WARNING: LINKEDIN_ACCESS_TOKEN is set but LINKEDIN_AUTHOR_URN is missing. Skipping LinkedIn post.');
    }
    return false;
  }

  const postText = text.replace(/\[LINK\]/g, articleUrl);
  console.log('\nPosting to LinkedIn...');

  try {
    const response = await fetch('https://api.linkedin.com/v2/ugcPosts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'X-Restli-Protocol-Version': '2.0.0',
      },
      body: JSON.stringify({
        author: authorUrn,
        lifecycleState: 'PUBLISHED',
        specificContent: {
          'com.linkedin.ugc.ShareContent': {
            shareCommentary: { text: postText },
            shareMediaCategory: 'ARTICLE',
            media: [
              {
                status: 'READY',
                originalUrl: articleUrl,
              },
            ],
          },
        },
        visibility: {
          'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC',
        },
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`LinkedIn API error (${response.status}): ${errorBody}`);
      return false;
    }

    console.log('LinkedIn post published successfully.');
    return true;
  } catch (err: unknown) {
    const error = err as Error;
    console.error(`LinkedIn posting failed: ${error.message}`);
    return false;
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main(): Promise<void> {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error('Usage: npx tsx scripts/social-post.ts [article-id]');
    console.error('       npx tsx scripts/social-post.ts --latest');
    process.exit(1);
  }

  // --- Find article ---
  const queue = readQueue();
  let article: QueueArticle | undefined;

  if (args[0] === '--latest') {
    const published = queue.queue
      .filter((a) => a.status === 'published' && a.publishedDate)
      .sort((a, b) => (b.publishedDate || '').localeCompare(a.publishedDate || ''));

    if (published.length === 0) {
      console.error('ERROR: No published articles found in the queue.');
      process.exit(1);
    }
    article = published[0];
  } else {
    const id = parseInt(args[0], 10);
    if (isNaN(id)) {
      console.error(`ERROR: Invalid article ID "${args[0]}". Must be a number or --latest.`);
      process.exit(1);
    }
    article = queue.queue.find((a) => a.id === id);
    if (!article) {
      console.error(`ERROR: Article with id ${id} not found in content queue.`);
      process.exit(1);
    }
  }

  const articleUrl = buildArticleUrl(article);

  console.log('='.repeat(60));
  console.log('  ShelbyAIDeals - Social Post Generator');
  console.log('='.repeat(60));
  console.log(`Article:  ${article.title}`);
  console.log(`URL:      ${articleUrl}`);
  console.log(`Status:   ${article.status}`);
  console.log('');

  // --- Generate social content ---
  let socialContent: Awaited<ReturnType<typeof generateSocialContent>>;
  try {
    socialContent = await generateSocialContent(article, articleUrl);
  } catch (err: unknown) {
    const error = err as Error;
    console.error(`ERROR: Failed to generate social content.`);
    console.error(error.message);
    process.exit(1);
  }

  // Replace [LINK] placeholders for display
  const twitterDisplay = socialContent.twitter.replace(/\[LINK\]/g, articleUrl);
  const linkedinDisplay = socialContent.linkedin.replace(/\[LINK\]/g, articleUrl);
  const redditDisplay = socialContent.redditBody.replace(/\[LINK\]/g, articleUrl);

  // --- Display generated content ---
  console.log('\n' + '-'.repeat(60));
  console.log('TWITTER/X POST:');
  console.log('-'.repeat(60));
  console.log(twitterDisplay);
  console.log(`(${twitterDisplay.length} chars)`);

  console.log('\n' + '-'.repeat(60));
  console.log('LINKEDIN POST:');
  console.log('-'.repeat(60));
  console.log(linkedinDisplay);

  console.log('\n' + '-'.repeat(60));
  console.log('REDDIT POST:');
  console.log('-'.repeat(60));
  console.log(`Title: ${socialContent.redditTitle}`);
  console.log(`Body:\n${redditDisplay}`);
  console.log(`Suggested subreddits: ${socialContent.suggestedSubreddits.map((s) => `r/${s}`).join(', ')}`);

  // --- Save drafts (always) ---
  ensureDraftsDir();

  const drafts: SocialDrafts = {
    articleId: article.id,
    articleTitle: article.title,
    articleUrl,
    generatedAt: new Date().toISOString(),
    twitter: {
      text: socialContent.twitter,
      charCount: twitterDisplay.length,
    },
    linkedin: {
      text: socialContent.linkedin,
    },
    reddit: {
      title: socialContent.redditTitle,
      body: socialContent.redditBody,
      suggestedSubreddits: socialContent.suggestedSubreddits,
    },
    posted: {
      twitter: false,
      linkedin: false,
    },
  };

  const draftPath = path.join(DRAFTS_DIR, `${article.slug}.json`);
  fs.writeFileSync(draftPath, JSON.stringify(drafts, null, 2) + '\n', 'utf-8');
  console.log(`\nDrafts saved: ${draftPath}`);

  // --- Post to social platforms ---
  const hasTwitterToken = !!process.env.TWITTER_BEARER_TOKEN;
  const hasLinkedInToken = !!process.env.LINKEDIN_ACCESS_TOKEN;

  if (!hasTwitterToken && !hasLinkedInToken) {
    console.log('\nNo social media tokens configured. Posts saved as drafts only.');
    console.log('Set TWITTER_BEARER_TOKEN and/or LINKEDIN_ACCESS_TOKEN to enable auto-posting.');
  } else {
    console.log('\n' + '='.repeat(60));
    console.log('  Posting to Social Media');
    console.log('='.repeat(60));

    if (hasTwitterToken) {
      const twitterSuccess = await postToTwitter(socialContent.twitter, articleUrl);
      drafts.posted.twitter = twitterSuccess;
    } else {
      console.log('\nTwitter: No TWITTER_BEARER_TOKEN set. Skipping.');
    }

    if (hasLinkedInToken) {
      const linkedinSuccess = await postToLinkedIn(socialContent.linkedin, articleUrl);
      drafts.posted.linkedin = linkedinSuccess;
    } else {
      console.log('\nLinkedIn: No LINKEDIN_ACCESS_TOKEN set. Skipping.');
    }

    // Update drafts file with posting results
    fs.writeFileSync(draftPath, JSON.stringify(drafts, null, 2) + '\n', 'utf-8');
  }

  // --- Summary ---
  console.log('\n' + '='.repeat(60));
  console.log('  Summary');
  console.log('='.repeat(60));
  console.log(`  Drafts saved:    ${draftPath}`);
  console.log(`  Twitter posted:  ${drafts.posted.twitter ? 'Yes' : 'No'}`);
  console.log(`  LinkedIn posted: ${drafts.posted.linkedin ? 'Yes' : 'No'}`);
  console.log(`  Reddit:          Manual posting required`);
  console.log('');
}

main().catch((err) => {
  console.error('Unexpected error:', err);
  process.exit(1);
});
