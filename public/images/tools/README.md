# Tool Screenshots — Naming Guide

Each tool has its own folder at `/public/images/tools/{tool-slug}/`.

## Required Images (3 minimum)

| File Name | Purpose | Size | Format |
|---|---|---|---|
| `screenshot-1.webp` | Dashboard / main interface | 1200x800 | WebP |
| `screenshot-2.webp` | Key feature in action | 1200x800 | WebP |
| `screenshot-3.webp` | Output or results example | 1200x800 | WebP |

## Optional Images

| File Name | Purpose | Size | Format |
|---|---|---|---|
| `hero.webp` | Hero image at top of review (16:9) | 1200x675 | WebP |
| `thumb.webp` | Card thumbnail on listing pages | 600x450 | WebP |
| `screenshot-4.webp` | Pricing page or plan selector | 1200x800 | WebP |
| `screenshot-5.webp` | Settings, integrations, or API | 1200x800 | WebP |
| `screenshot-6.webp` | Mobile view or alternative layout | 1200x800 | WebP |

## Rules

- Use **WebP** format (smaller file size, supported everywhere)
- PNG is acceptable as fallback — the site checks for `.webp` first, then `.png`
- Keep file sizes under **200KB** per image (compress with squoosh.app or tinypng.com)
- Name files **exactly** as shown — the code auto-detects `screenshot-1` through `screenshot-6`
- Number screenshots in order of importance (1 = most important, shown first)
- Capture real UI — no mockups, no stock photos

## What to Screenshot

| Screenshot # | What to Capture | Example |
|---|---|---|
| 1 | Main dashboard or home screen after login | "Pictory project dashboard with templates" |
| 2 | The tool's primary feature being used | "ElevenLabs voice generation interface with waveform" |
| 3 | Real output or result from the tool | "Generated video preview in Synthesia editor" |
| 4 | Pricing page (helps verify our pricing data) | "Pictory pricing plans comparison table" |
| 5 | Settings, integrations, or advanced features | "Frase SERP analysis panel" |

## Folder Structure Example

```
public/images/tools/
├── pictory/
│   ├── hero.webp            ← Optional: hero banner
│   ├── thumb.webp           ← Optional: card thumbnail
│   ├── screenshot-1.webp    ← Dashboard view
│   ├── screenshot-2.webp    ← Blog-to-video converter
│   └── screenshot-3.webp    ← Generated video preview
├── elevenlabs/
│   ├── screenshot-1.webp    ← Voice generation interface
│   ├── screenshot-2.webp    ← Voice cloning setup
│   └── screenshot-3.webp    ← Audio output waveform
└── frase/
    ├── screenshot-1.webp    ← Content editor
    ├── screenshot-2.webp    ← SERP analysis
    └── screenshot-3.webp    ← Content brief builder
```

## Current Tools (31 folders)

chatbase, chatgpt, claude-ai, copy-ai, decktopus-ai, descript, easy-peasy-ai,
elevenlabs, fliki, frase, google-gemini, grammarly, grok, jasper-ai, julius-ai,
leonardo-ai, make, mangools, midjourney, mixo, mubert, otter-ai, perplexity,
pictory, runway-ml, rytr, semrush, simplified, surfer-seo, synthesia, writesonic
