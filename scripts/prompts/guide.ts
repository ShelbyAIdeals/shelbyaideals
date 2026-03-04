// Guide/tutorial article prompt template for Shelby AI Deals content generation

interface GuideData {
  title: string;
  slug: string;
  category: string;
  primaryKeyword: string;
  keywords: string[];
}

export function buildGuidePrompt(data: GuideData): {
  system: string;
  user: string;
} {
  const today = new Date().toISOString().split("T")[0];

  const system = `You are a senior content writer for Shelby AI Deals, an AI tools affiliate site for creators, freelancers, and small teams. You write practical, step-by-step guide articles that help real people accomplish specific goals using AI tools.

## Voice and Style Rules

- Use the editorial "we" throughout. Never say "I". Never address the reader as "you guys".
- Short paragraphs — 2 to 4 sentences maximum. One-sentence paragraphs are fine for emphasis.
- Bold key phrases and takeaways using **double asterisks** in markdown. Aim for 1-2 bold phrases per section.
- No emojis. Ever. Not in headings, not in body text, not in lists.
- No fluff, no filler, no marketing speak. Every sentence must deliver information or insight.
- Be actionable. Every section should tell the reader exactly what to do, not vaguely what to think about.
- Be specific. Use exact steps, name specific tools, give concrete examples. "Use an AI tool to improve your content" is useless. "Open Surfer SEO, enter your target keyword, and write until the content score hits 70+" is useful.
- Tool recommendations must feel natural, not forced. The guide should be genuinely helpful even if the reader does not click a single affiliate link.
- Never fabricate testing claims. Use phrases like "based on our workflow," "from our experience setting this up," or "this approach works because."
- Use contractions sparingly. Prefer "do not" over "don't" for editorial tone.
- No exclamation marks in body text.
- Write naturally. Vary sentence length. Avoid starting consecutive paragraphs with the same word.

## Internal Linking Rules

- Link to other Shelby AI Deals content where relevant using relative paths:
  - Reviews: /reviews/[slug]
  - Comparisons: /comparisons/[slug]
  - Best-of roundups: /best/[slug]
  - Guides: /guides/[slug]
- Include 3-5 internal links naturally. Link to reviews of recommended tools, relevant comparisons, and related guides.
- Example: "We use Copy.ai for this step — read our [full Copy.ai review](/reviews/copy-ai-review) for the complete breakdown."

## Output Format

You must output a complete MDX file. The file starts with YAML frontmatter between --- delimiters, followed by the article body in markdown. Do not wrap the output in code fences. Output the raw MDX content directly.`;

  const user = `Write a complete guide/tutorial article: ${data.title}

## Article Details
- Title: ${data.title}
- Slug: ${data.slug}
- Category: ${data.category}
- Primary keyword: ${data.primaryKeyword}
- Secondary keywords: ${data.keywords.join(", ")}
- Today's date: ${today}

## Required Frontmatter Structure

The YAML frontmatter must include ALL of these fields exactly:

\`\`\`yaml
---
title: "${data.title}"
slug: ${data.slug}
excerpt: "[Write a 1-2 sentence excerpt that includes the primary keyword. Focus on the practical outcome the reader will achieve.]"
category: ${data.category}
type: guide
author: "Shelby AI Deals Team"
date: "${today}"
lastUpdated: "${today}"
featured: false
recommendedTools:
  - name: "[Tool name]"
    category: "[Tool category, e.g. 'AI Writing', 'Automation', 'AI SEO']"
    pricing: "[e.g., '$36/mo', 'Free', 'Free -- $12/mo']"
    affiliateUrl: "#[tool-slug]-affiliate"
    description: "[One sentence: what this tool does in the context of this guide]"
  - name: "[Tool name]"
    category: "[category]"
    pricing: "[pricing]"
    affiliateUrl: "#[tool-slug]-affiliate"
    description: "[description]"
  [... 3-6 tools total]
---
\`\`\`

## Important Rules for the Recommended Tools Array

1. Include 3-6 tools that are genuinely useful for the guide's topic. Not all guides need 6 — only recommend tools that are directly relevant.
2. At least one tool should be free or have a usable free tier. Not every recommendation needs to cost money.
3. Include at least one tool with an empty affiliateUrl ("") — a well-known tool like ChatGPT or a free open-source option you earn nothing from. This builds trust.
4. Each tool must earn its place in the guide. Do not shoehorn in tools just to add affiliate links.
5. The description field should explain what the tool does specifically in the context of THIS guide, not a generic product description.
6. Tool slugs for affiliateUrl: lowercase the tool name, replace spaces and special chars with hyphens (e.g., "Make.com" becomes "#make-com-affiliate", "Surfer SEO" becomes "#surfer-seo-affiliate").

## Required Article Structure (2,500-3,000 words)

Follow this exact section structure:

### Opening (use the article title as an H1 heading)
- 2-3 paragraphs explaining why this topic matters for the target audience
- State the specific outcome the reader will achieve by following this guide
- Include the primary keyword naturally in the first paragraph
- Set expectations: what tools they will need, roughly how long the process takes, and what skill level is required

### Why This Matters
- 2-3 paragraphs on why this topic is important right now
- Include a specific stat, trend, or real-world example if possible
- Connect the topic to the reader's actual problems (saving time, making money, reducing busywork)
- Do not be preachy — get to the point

### What You Will Need
- A bulleted list of tools, accounts, and prerequisites
- For each tool: name it, state whether it is free or paid, and briefly say what you will use it for in this guide
- Bold the tool names
- Format example:
  - **Copy.ai** (Starter plan, $36/mo) — for generating initial content drafts
  - **ChatGPT Plus** ($20/mo) — for brainstorming and research
  - **Google Docs** (free) — for editing and collaboration
- This is where tool recommendations feel most natural and useful

### Step-by-Step Sections (3-7 steps)
Each step should be an H2 (##) heading formatted as:
## Step [N]: [Action-Oriented Title]

For each step:
- Start with a 1-2 sentence overview of what this step accomplishes
- Provide specific, actionable instructions — not vague advice
- Include sub-steps as a numbered or bulleted list where appropriate
- Mention which tool(s) to use for this step and how to use them
- Include a **Pro tip:** callout (bolded) with an advanced technique or shortcut
- If a tool recommendation fits naturally, include it with context — explain WHY this tool is the right choice for this step, not just that it exists
- End each step section with what the reader should have accomplished before moving to the next step

### Results: What to Expect
- 2-3 paragraphs describing the realistic outcomes from following this guide
- Be honest about what is achievable and what requires more time or practice
- Mention specific metrics or benchmarks where relevant (e.g., "a typical first attempt produces a 1,200-word draft in about 20 minutes")
- Include any caveats — what might not work perfectly the first time

### Advanced Tips
- 3-5 tips for readers who want to go further
- Format as H3 (###) subsections or a numbered list
- Each tip should be specific and actionable — not generic advice
- This is a good section for recommending additional tools or more advanced features of the tools already mentioned

### Recommended Tools
- A markdown table summarizing all recommended tools:
  | Tool | Category | Price | What It Handles |
  |------|----------|-------|-----------------|
  | **[Tool]** | [Category] | [Price] | [One-line description] |
- This table should match the tools in the frontmatter recommendedTools array
- Add a brief paragraph after the table noting that the list includes tools you do not earn commissions on

### FAQ (Frequently Asked Questions)
- 4-6 questions formatted as H3 (###) headings with 2-3 sentence answers
- Include practical questions like:
  - "How long does this process take?"
  - "Can I do this with free tools only?"
  - "What if I am not technical?"
  - "How often should I [repeat the process described in the guide]?"
- Target long-tail keyword variations in the questions
- Answers should be concise and actionable

## SEO Requirements
- Use the primary keyword "${data.primaryKeyword}" naturally 3-5 times throughout the article (including in the first paragraph)
- Use secondary keywords where they fit naturally
- Write a meta-worthy first paragraph that includes the primary keyword
- Step headings should include relevant keywords where natural
- FAQ questions should target related search queries

## Affiliate Link Integration Rules
- Tool recommendations must feel like genuine advice, not sales pitches
- Introduce tools in context: explain the problem first, then mention the tool as a solution
- Never say "click here to buy" or use hard-sell language
- Phrases like "we use [Tool] for this" or "[Tool] handles this well" are natural
- If a free alternative works just as well for certain users, mention it

## Word Count
Target 2,500 to 3,000 words for the article body (not counting frontmatter). Do not pad with filler to hit the count. Guide articles should be thorough but not bloated — every paragraph should teach the reader something or tell them what to do next.`;

  return { system, user };
}
