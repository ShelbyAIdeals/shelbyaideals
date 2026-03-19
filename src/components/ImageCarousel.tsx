'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageCarouselProps {
  images: { src: string; alt: string }[];
}

export default function ImageCarousel({ images }: ImageCarouselProps) {
  const [current, setCurrent] = useState(0);

  if (!images || images.length === 0) return null;

  const prev = () => setCurrent((current - 1 + images.length) % images.length);
  const next = () => setCurrent((current + 1) % images.length);

  return (
    <div className="relative group aspect-video rounded-xl overflow-hidden border border-void-700/50 bg-void-800">
      <img
        src={images[current].src}
        alt={images[current].alt}
        className="w-full h-full object-contain"
      />

      {images.length > 1 && (
        <>
          {/* Left arrow */}
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-void-950/60 backdrop-blur-sm border border-void-700/40 flex items-center justify-center text-void-300 hover:text-void-50 hover:bg-void-950/80 transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
            aria-label="Previous image"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Right arrow */}
          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-void-950/60 backdrop-blur-sm border border-void-700/40 flex items-center justify-center text-void-300 hover:text-void-50 hover:bg-void-950/80 transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
            aria-label="Next image"
          >
            <ChevronRight size={20} />
          </button>

          {/* Dot indicators */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                  i === current
                    ? 'bg-signal-400 w-4'
                    : 'bg-void-400/50 hover:bg-void-300/70'
                }`}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
