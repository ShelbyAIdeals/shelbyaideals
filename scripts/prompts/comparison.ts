// Comparison article prompt template for Shelby AI Deals content generation

interface ComparisonData {
  title: string;
  slug: string;
  category: string;
  primaryKeyword: string;
  keywords: string[];
  tools: string[];
}

export function buildComparisonPrompt(data: ComparisonData): {
  system: string;
  user: string;
} {
  const today = new Date().toISOString().split("T")[0];

  const toolSlugs = data.tools.map((tool) =>
    tool
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  );

  const affiliateUrlsYaml = data.tools
    .map((tool, i) => `  "${tool}": "#${toolSlugs[i]}-affiliate"`)
    .join("\n");

  const toolsYaml = data.tools.map((t) => `  - "${t}"`).join("\n");

  const system = `You are a senior content writer for Shelby AI Deals, an AI tools affiliate site for creators, freelancers, and small teams. You write honest, editorial-quality comparison articles that help real people decide between competing tools.

## Voice and Style Rules

- Use the editorial "we" throughout. Never say "I". Never address the reader as "you guys".
- Short paragraphs — 2 to 4 sentences maximum. One-sentence paragraphs are fine for emphasis.
- Bold key phrases and takeaways using **double asterisks** in markdown. Aim for 1-2 bold phrases per section.
- No emojis. Ever. Not in headings, not in body text, not in lists.
- No fluff, no filler, no marketing speak. Every sentence must deliver information or insight.
- Be specific. Use numbers, name features, give concrete examples.
- Be fair. Do not trash one tool to make another look good. Present genuine strengths and weaknesses for each.
- Never fabricate testing claims. Use phrases like "based on our analysis," "from our evaluation," or "from documented features and user feedback."
- Use contractions sparingly. Prefer "do not" over "don't" for editorial tone.
- No exclamation marks in body text.
- Write naturally. Vary sentence length. Avoid starting consecutive paragraphs with the same word.

## Internal Linking Rules

- Link to other Shelby AI Deals content where relevant using relative paths:
  - Reviews: /reviews/[slug]
  - Comparisons: /comparisons/[slug]
  - Best-of roundups: /best/[slug]
  - Guides: /guides/[slug]
- Include 2-4 internal links naturally. Link to individual reviews of the tools being compared if they could exist on the site.
- Example: "For the full breakdown, see our [Jasper AI review](/reviews/jasper-ai-review)."

## Output Format

You must output a complete MDX file. The file starts with YAML frontmatter between --- delimiters, followed by the article body in markdown. Do not wrap the output in code fences. Output the raw MDX content directly.`;

  const user = `Write a complete comparison article: ${data.title}

## Article Details
- Title: ${data.title}
- Slug: ${data.slug}
- Category: ${data.category}
- Primary keyword: ${data.primaryKeyword}
- Secondary keywords: ${data.keywords.join(", ")}
- Tools being compared: ${data.tools.join(" vs ")}
- Today's date: ${today}

## Required Frontmatter Structure

The YAML frontmatter must include ALL of these fields exactly:

\`\`\`yaml
---
title: "${data.title}"
slug: ${data.slug}
excerpt: "[Write a 1-2 sentence excerpt that includes the primary keyword and names the tools. Be specific about what the comparison covers.]"
category: ${data.category}
type: comparison
author: "Shelby AI Deals Team"
date: "${today}"
lastUpdated: "${today}"
featured: false
tools:
${toolsYaml}
winners:
  - scenario: "[Specific use case scenario, e.g. 'Best for Solo Freelancers']"
    winner: "[Tool name — must be one of the compared tools, or 'Tie']"
    reason: "[One sentence explaining why this tool wins this scenario]"
  - scenario: "[Another scenario]"
    winner: "[Tool name]"
    reason: "[Reason]"
  - scenario: "[At least 3-5 winner scenarios total. Cover different user types, budgets, and use cases.]"
    winner: "[Tool name]"
    reason: "[Reason]"
affiliateUrls:
${affiliateUrlsYaml}
---
\`\`\`

Important: The winners array must have 3-5 entries covering different scenarios. Do NOT just pick one overall winner. Different tools win for different users — reflect that honestly.

## Required Article Structure (2,500-3,000 words)

Follow this exact section structure using H2 (##) and H3 (###) headings:

### 1. Quick Verdict: Who Wins?
- Start with a markdown table summarizing the winner scenarios:
  | Scenario | Winner | Why |
  |---|---|---|
  | ... | ... | ... |
- Follow with 2 short paragraphs: one for each primary recommendation (e.g., "If you need X, choose Tool A because..." and "If you need Y, choose Tool B because...")
- Add a horizontal rule (---) after this section

### 2. How We Evaluated
- Explain the evaluation methodology in 2-3 paragraphs
- List the specific criteria used (output quality, ease of use, pricing value, integrations, learning curve, etc.)
- Base this on analysis of documented features, public reviews, and official product information
- Use phrases like "we evaluated based on" or "our analysis focused on" — do not claim hands-on testing you did not do

### 3. ${data.tools[0]}: Strengths and Weaknesses
- 3-4 paragraphs covering this tool's market position, key strengths, and notable weaknesses
- Link to the individual review if it could exist: [full ${data.tools[0]} review](/reviews/[slug])
- Use bold **Key Strengths:** and **Key Weaknesses:** labels with bullet points

### 4. ${data.tools.length > 2 ? data.tools.slice(1).map((t, i) => `${t}: Strengths and Weaknesses`).join("\n\n### " + (5 + "").slice(0) + ". ") : `${data.tools[1]}: Strengths and Weaknesses`}
${data.tools.slice(1).map((t) => `- Same structure as above for ${t}. Link to its individual review.`).join("\n")}

### ${data.tools.length + 3}. Head-to-Head Comparison
Use H3 subsections for each comparison dimension:

#### Features
- Compare the feature sets side by side. What does each tool do that the other does not?

#### Ease of Use
- Compare onboarding experience, learning curve, and day-to-day workflow

#### Output Quality
- Compare what each tool actually produces. Be specific about where each excels.

#### Pricing
- Side-by-side pricing comparison. Include a markdown table:
  | Feature | ${data.tools.join(" | ")} |
  |---|${data.tools.map(() => "---|").join("")}
  | Starting Price | ... |
  | Free Tier | ... |
  | Best Plan for Solos | ... |
  | Best Plan for Teams | ... |

#### Integrations
- What does each tool connect with? Which has better ecosystem support?

### ${data.tools.length + 4}. Real-World Scenarios
- 3-4 specific scenarios (e.g., "A freelance copywriter writing 10 blog posts per month") with a clear recommendation for each
- Make these practical and relatable to the target audience (creators, freelancers, small teams)

### ${data.tools.length + 5}. Pricing Comparison
- Detailed pricing breakdown with a comparison table
- Calculate real-world monthly costs for different usage levels
- Identify the best value at each price point

### ${data.tools.length + 6}. Who Should Choose ${data.tools[0]}
- 3-4 bullet points describing the ideal user for this tool
- Be specific about use cases, budgets, and team sizes

### ${data.tools.length + 7}. Who Should Choose ${data.tools.length > 2 ? "Each Alternative" : data.tools[1]}
${data.tools.slice(1).map((t) => `- 3-4 bullet points describing the ideal user for ${t}`).join("\n")}

### ${data.tools.length + 8}. Final Recommendation
- 2-3 paragraphs with the definitive recommendation
- Restate the scenario-based winners
- End with a clear, actionable statement: "If you [specific situation], go with [tool]. If you [other situation], go with [other tool]."

## SEO Requirements
- Use the primary keyword "${data.primaryKeyword}" naturally 3-5 times throughout the article (including in the first paragraph)
- Use secondary keywords where they fit naturally
- Write a meta-worthy first paragraph that includes the primary keyword

## Fairness Rules
- Do not declare one tool universally better. Each tool wins in different scenarios.
- If one tool is genuinely weaker overall, still highlight what it does well.
- Mention pricing as a legitimate factor — a cheaper tool that does 80% of the job is a valid winner for budget-conscious users.

## Word Count
Target 2,500 to 3,000 words for the article body (not counting frontmatter). Do not pad with filler to hit the count.`;

  return { system, user };
}
