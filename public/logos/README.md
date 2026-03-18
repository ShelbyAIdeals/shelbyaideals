# Tool Logos — Naming Guide

Store tool logos at `/public/logos/{tool-slug}.png`.

## Specifications

| Property | Value |
|---|---|
| Format | **PNG** (transparent background) or **SVG** |
| Size | **200x200px** (square) |
| Background | Transparent |
| Max file size | 50KB |

## Naming Convention

The filename must match the tool's slug exactly:

```
public/logos/
├── pictory.png
├── elevenlabs.png
├── synthesia.png
├── frase.png
├── chatgpt.png
├── grammarly.png
└── ... (one per tool)
```

## Where Logos Appear

- **Review cards** — small circular badge overlapping the thumbnail (40x40px display)
- **Tool list view** — inline with tool name (48x48px display)
- **Quick verdict sidebar** — next to tool name on review pages

## How to Get Logos

1. Go to the tool's website
2. Right-click their logo → "Save image as"
3. Or check their press/brand page (most tools have downloadable logos)
4. Resize to 200x200 square, keep transparent background
5. Save as PNG with the tool slug as filename

## Current Logos Needed (31 tools)

chatbase, chatgpt, claude-ai, copy-ai, decktopus-ai, descript, easy-peasy-ai,
elevenlabs, fliki, frase, google-gemini, grammarly, grok, jasper-ai, julius-ai,
leonardo-ai, make, mangools, midjourney, mixo, mubert, otter-ai, perplexity,
pictory, runway-ml, rytr, semrush, simplified, surfer-seo, synthesia, writesonic

## Notes

- The current `.svg` files are placeholders — replace with real logos
- Both `.png` and `.svg` are supported — PNG preferred for consistency
- The code references logos via the `toolLogo` field in review frontmatter:
  ```yaml
  toolLogo: "/logos/pictory.png"
  ```
