/**
 * Generates a static JSON file of all review metadata for client-side use.
 * Run before `next build` so /data/reviews.json is available at runtime.
 */
import fs from 'fs';
import path from 'path';
import { getAllReviews } from '../src/lib/content';

const outputDir = path.join(process.cwd(), 'public/data');
fs.mkdirSync(outputDir, { recursive: true });

const reviews = getAllReviews();
fs.writeFileSync(
  path.join(outputDir, 'reviews.json'),
  JSON.stringify(reviews, null, 2)
);

console.log(`Generated public/data/reviews.json (${reviews.length} reviews)`);
