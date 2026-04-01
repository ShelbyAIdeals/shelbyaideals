/**
 * Convert PNG/JPG images to WebP for better performance.
 * Keeps originals intact — WebP files are created alongside them.
 * The review page image discovery already prefers .webp over .png.
 *
 * Usage: node scripts/optimize-images.mjs
 *        node scripts/optimize-images.mjs --dry-run
 */

import sharp from 'sharp';
import { readdirSync, statSync, existsSync } from 'fs';
import { resolve, extname, basename, dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');
const publicDir = resolve(projectRoot, 'public');

const DIRS = ['images', 'logos'];
const EXTENSIONS = new Set(['.png', '.jpg', '.jpeg']);
const QUALITY = 80;
const dryRun = process.argv.includes('--dry-run');

function collectImages(dir) {
  const results = [];
  if (!existsSync(dir)) return results;

  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...collectImages(fullPath));
    } else if (EXTENSIONS.has(extname(entry.name).toLowerCase())) {
      results.push(fullPath);
    }
  }
  return results;
}

async function main() {
  const images = DIRS.flatMap((d) => collectImages(resolve(publicDir, d)));
  console.log(`Found ${images.length} images to convert\n`);

  let converted = 0;
  let skipped = 0;
  let savedBytes = 0;

  for (const imgPath of images) {
    const ext = extname(imgPath);
    const webpPath = imgPath.slice(0, -ext.length) + '.webp';

    if (existsSync(webpPath)) {
      skipped++;
      continue;
    }

    if (dryRun) {
      console.log(`[dry-run] Would convert: ${imgPath}`);
      converted++;
      continue;
    }

    try {
      const originalSize = statSync(imgPath).size;
      await sharp(imgPath).webp({ quality: QUALITY }).toFile(webpPath);
      const newSize = statSync(webpPath).size;
      const saving = ((1 - newSize / originalSize) * 100).toFixed(0);
      savedBytes += originalSize - newSize;
      converted++;
      console.log(
        `  ${basename(imgPath)} -> .webp  ${(originalSize / 1024).toFixed(0)}KB -> ${(newSize / 1024).toFixed(0)}KB  (-${saving}%)`
      );
    } catch (err) {
      console.error(`  Error converting ${imgPath}: ${err.message}`);
    }
  }

  console.log(`\nDone: ${converted} converted, ${skipped} skipped (already exist)`);
  if (!dryRun && savedBytes > 0) {
    console.log(`Total saved: ${(savedBytes / 1024 / 1024).toFixed(1)}MB`);
  }
}

main().catch(console.error);
