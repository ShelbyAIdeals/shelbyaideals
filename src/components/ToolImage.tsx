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
  const src = `/images/tools/${toolSlug}/${variant}.webp`;
  const fallback = `/images/placeholders/tool-${variant}.svg`;
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={`w-full h-full object-cover ${className}`}
      loading="lazy"
      onError={() => {
        if (imgSrc !== fallback) setImgSrc(fallback);
      }}
    />
  );
}
