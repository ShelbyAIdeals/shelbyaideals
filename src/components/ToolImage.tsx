'use client';

import { useState } from 'react';

interface ToolImageProps {
  toolSlug: string;
  variant?: 'hero' | 'thumb';
  alt?: string;
  className?: string;
}

export default function ToolImage({
  toolSlug,
  variant = 'thumb',
  alt = 'Tool screenshot',
  className = '',
}: ToolImageProps) {
  const webp = `/images/tools/${toolSlug}/${variant}.webp`;
  const png = `/images/tools/${toolSlug}/${variant}.png`;
  const svg = `/images/tools/${toolSlug}/${variant}.svg`;
  const fallback = `/images/placeholders/tool-${variant}.svg`;
  const [imgSrc, setImgSrc] = useState(webp);

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={`w-full h-full object-cover ${className}`}
      loading="lazy"
      onError={() => {
        if (imgSrc === webp) setImgSrc(png);
        else if (imgSrc === png) setImgSrc(svg);
        else if (imgSrc !== fallback) setImgSrc(fallback);
      }}
    />
  );
}
