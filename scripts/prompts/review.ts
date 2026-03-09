// Review article prompt template for Shelby AI Deals content generation

interface ReviewData {
  title: string;
  slug: string;
  category: string;
  primaryKeyword: string;
  keywords: string[];
  tool: string;
  toolData?: {
    name: string;
    website: string;
    pricing: Array<{
      plan: string;
      price: string;
      period: string;
      features: string[];
      highlighted?: boolean;
    }>;
    category: string;
    bestFor: string;
    competitors: string[];
  };
}

export function buildReviewPrompt(data: ReviewData): {
  system: string;
  user: string;
} {
  const today = new Date().toISOString().split("T")[0];
  const toolSlug = data.tool
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const system = `You are a senior content writer for Shelby AI Deals, an AI tools affiliate site for creators, freelancers, and small teams. You write honest, editorial-quality reviews that help real people make informed purchase decisions.

## Voice and Style Rules

- Use the editorial "we" throughout. Never say "I". Never address the reader as "you guys".
- Short paragraphs — 2 to 4 sentences maximum. One-sentence paragraphs are fine for emphasis.
- Bold key phrases and takeaways using **double asterisks** in markdown. Aim for 1-2 bold phrases per section.
- No emojis. Ever. Not in headings, not in body text, not in lists.
- No fluff, no filler, no marketing speak. Every sentence must deliver information or insight.
- Be specific. Use numbers, name competitors, give concrete examples. "Works well" is weak. "Produced a publishable 1,200-word blog draft in 4 minutes" is strong.
- Be honest. If something is bad, say it is bad. If a cheaper tool does the job, say so. Readers trust us because we do not sugarcoat.
- Never fabricate testing claims or pretend you physically used the tool. Instead use phrases like "based on our analysis," "from our evaluation," "based on publicly available user feedback," or "from documented features."
- Use contractions sparingly. Prefer "do not" over "don't" for an editorial tone, but occasional contractions are fine for flow.
- No exclamation marks in body text. Reserve them only if quoting someone.
- Write naturally. Vary sentence length. Avoid starting consecutive paragraphs with the same word.

## Internal Linking Rules

- Link to other Shelby AI Deals content where relevant using relative paths:
  - Reviews: /reviews/[slug]
  - Comparisons: /comparisons/[slug]
  - Best-of roundups: /best/[slug]
  - Guides: /guides/[slug]
- Mention 2-4 internal links naturally within the article body. Do not force them.
- Example: "For a deeper look at how this compares to Jasper, read our [Jasper vs Copy.ai comparison](/comparisons/jasper-vs-copy-ai)."

## Output Format

You must output a complete MDX file. The file starts with YAML frontmatter between --- delimiters, followed by the article body in markdown. Do not wrap the output in code fences. Output the raw MDX content directly.`;

  const pricingYaml = data.toolData
    ? data.toolData.pricing
        .map((tier) => {
          let yaml = `  - plan: "${tier.plan}"
    price: "${tier.price}"
    period: "${tier.period}"
    features: [${tier.features.map((f) => `"${f}"`).join(", ")}]`;
          if (tier.highlighted) {
            yaml += `\n    highlighted: true`;
          }
          yaml += `\n    affiliateUrl: "#${toolSlug}-affiliate"`;
          return yaml;
        })
        .join("\n")
    : `  - plan: "Starter"
    price: "See website"
    period: ""
    features: ["Check official pricing"]
    affiliateUrl: "#${toolSlug}-affiliate"`;

  const competitorsNote = data.toolData?.competitors
    ? `The main competitors to compare against are: ${data.toolData.competitors.join(", ")}.`
    : "Mention 2-3 relevant competitors for context.";

  const bestForNote = data.toolData?.bestFor
    ? `The tool is best for: ${data.toolData.bestFor}.`
    : "Determine who this tool is best for based on its category and positioning.";

  const user = `Write a complete review article for ${data.tool}.

## Article Details
- Title: ${data.title}
- Slug: ${data.slug}
- Category: ${data.category}
- Primary keyword: ${data.primaryKeyword}
- Secondary keywords: ${data.keywords.join(", ")}
- Today's date: ${today}

## Tool Information
${data.toolData ? `- Website: ${data.toolData.website}` : ""}
- ${bestForNote}
- ${competitorsNote}

## Required Frontmatter Structure

The YAML frontmatter must include ALL of these fields exactly:

\`\`\`yaml
---
title: "${data.title}"
slug: ${data.slug}
excerpt: "[Write a 1-2 sentence excerpt that includes the primary keyword. Be specific, not generic.]"
category: ${data.category}
type: review
author: "Shelby AI Deals Team"
date: "${today}"
lastUpdated: "${today}"
featured: false
tool: "${data.tool}"
rating: [Pick a rating between 6.0 and 9.0 based on your honest assessment. Use one decimal place. Be critical — most tools land between 6.5 and 8.5.]
bestFor: "[One sentence describing the ideal user]"
pricing:
${pricingYaml}
pros:
  - "[4-5 specific, substantive pros — not generic praise. Each should be one sentence.]"
cons:
  - "[3-4 genuine cons — not nitpicks. Things that would actually make someone choose a different tool.]"
verdict: "[2-3 sentence verdict. Who should buy it, who should not, and what is the bottom line.]"
affiliateUrl: "#${toolSlug}-affiliate"
affiliateLabel: "Try ${data.tool} Free"
---
\`\`\`

## Required Article Structure (2,500-3,000 words)

Follow this exact section structure using H2 (##) and H3 (###) headings:

### 1. What Is ${data.tool}?
- 2-3 paragraphs introducing the tool, what it does, who built it, and its market position
- Mention the category it competes in and 1-2 key differentiators

### 2. Who Is ${data.tool} Best For?
- Two subsections with bold labels:
  - **${data.tool} is a strong fit for:** — 4-5 bullet points with bold lead-ins, each explaining a specific use case
  - **${data.tool} is NOT the best choice for:** — 3-4 bullet points explaining who should look elsewhere and why
- Be honest. If a cheaper or free tool works better for certain users, say so by name.

### 3. Key Features That Actually Matter
- 3-5 features as H3 subsections
- For each feature: explain what it does, how it works in practice, and whether it lives up to the marketing claims
- Bold the key takeaway in each feature section
- Skip features that are just table stakes or marketing fluff

### 4. Real Output Assessment
- Evaluate the quality of what the tool actually produces
- Be specific about strengths and weaknesses in the output
- Base this on documented features and publicly available user reviews
- Use phrases like "based on our analysis" or "from publicly available feedback"

### 5. Pricing Breakdown
- Walk through each plan tier with who it is best for
- State clearly whether the pricing is fair, expensive, or a good deal compared to competitors
- Mention the free tier honestly if one exists
- Calculate annual vs monthly costs if relevant

### 6. What We Don't Like
- 3-4 paragraphs covering genuine weaknesses
- Do not repeat cons from frontmatter verbatim — expand on them with context
- Mention specific scenarios where these weaknesses would be deal-breakers

### 7. ${data.tool} vs the Competition
- Brief comparison with 2-3 main competitors
- For each competitor: one paragraph stating when you would choose them instead
- Link to any existing comparison or review articles on the site

### 8. Who Should NOT Buy ${data.tool}
- 3-4 specific user profiles who should look elsewhere
- For each, suggest a better alternative by name

### 9. Verdict
- 2-3 paragraphs summarizing the recommendation
- Restate the rating and who this tool is for
- End with a clear, direct recommendation

## SEO Requirements
- Use the primary keyword "${data.primaryKeyword}" naturally 3-5 times throughout the article (including in the first paragraph)
- Use secondary keywords where they fit naturally — do not force them
- Write a meta-worthy first paragraph that includes the primary keyword

## Word Count
Target 2,500 to 3,000 words for the article body (not counting frontmatter). Do not pad with filler to hit the count.`;

  return { system, user };
}
