'use client';

import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ScreenshotGalleryProps {
  images: { src: string; alt: string }[];
}

export default function ScreenshotGallery({ images }: ScreenshotGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (!images || images.length === 0) return null;

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 my-8">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setLightboxIndex(i)}
            className="aspect-video rounded-lg overflow-hidden border border-void-700/50 bg-void-800 hover:border-accent-500/30 transition-colors cursor-pointer"
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-void-950/90 backdrop-blur-sm"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-4 right-4 text-void-300 hover:text-void-50 cursor-pointer"
          >
            <X size={28} />
          </button>

          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((lightboxIndex - 1 + images.length) % images.length);
                }}
                className="absolute left-4 text-void-300 hover:text-void-50 cursor-pointer"
              >
                <ChevronLeft size={32} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((lightboxIndex + 1) % images.length);
                }}
                className="absolute right-4 text-void-300 hover:text-void-50 cursor-pointer"
              >
                <ChevronRight size={32} />
              </button>
            </>
          )}

          <img
            src={images[lightboxIndex].src}
            alt={images[lightboxIndex].alt}
            className="max-w-[90vw] max-h-[85vh] rounded-xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
