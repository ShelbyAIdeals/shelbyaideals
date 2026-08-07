import path from 'node:path';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // This project sits inside a parent directory that also has a lockfile, so
  // Next was inferring the workspace root two levels up and warning on every
  // build. Pin it to this project.
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
