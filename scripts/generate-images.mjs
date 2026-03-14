import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { GoogleGenerativeAI } = require('@google/generative-ai');
import { writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');
const publicImages = resolve(projectRoot, 'public/images');

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  console.error('Error: GEMINI_API_KEY not set. Add it to .env.local');
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(API_KEY);

async function generateImage(prompt, outputPath) {
  console.log(`Generating: ${outputPath}...`);
  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-3.1-flash-image-preview',
      generationConfig: { responseModalities: ['image', 'text'] },
    });
    const response = await model.generateContent(prompt);
    const result = response.response;

    for (const part of result.candidates[0].content.parts) {
      if (part.inlineData) {
        const buffer = Buffer.from(part.inlineData.data, 'base64');
        mkdirSync(dirname(outputPath), { recursive: true });
        writeFileSync(outputPath, buffer);
        console.log(`  Saved: ${outputPath} (${(buffer.length / 1024).toFixed(0)}KB)`);
        return true;
      }
    }
    console.log('  No image data in response');
    return false;
  } catch (err) {
    console.error(`  Error: ${err.message}`);
    return false;
  }
}

const images = [
  {
    prompt: `Create a wide hero illustration for a tech website. Dark background color #0b0e17. Abstract isometric 2.5D workspace showing floating translucent UI cards and holographic tool interfaces connected by glowing teal (#0ad1c8) and amber (#f59e0b) neural network lines. Minimal geometric style, no text, no people. Purple (#8b5cf6) accent highlights. Premium SaaS aesthetic, clean and modern. Wide landscape format 16:9.`,
    output: resolve(publicImages, 'hero-illustration.png'),
  },
  {
    prompt: `Create an Open Graph social media preview image (1200x630). Dark navy background #0b0e17 with subtle grid pattern. Center text "ShelbyAI Deals" in bold white geometric sans-serif font. Below it smaller text "Honest AI Tool Reviews". Teal (#0ad1c8) accent glow behind the text. Small lightning bolt icon in teal. Clean, professional, minimal. No busy elements.`,
    output: resolve(publicImages, 'og-thumbnail-new.png'),
  },
];

async function main() {
  console.log('Starting image generation...\n');
  for (const img of images) {
    await generateImage(img.prompt, img.output);
    // Small delay between requests
    await new Promise(r => setTimeout(r, 2000));
  }
  console.log('\nDone!');
}

main().catch(console.error);
