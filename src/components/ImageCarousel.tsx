'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';

interface ImageCarouselProps {
  images: { src: string; alt: string }[];
}

export default function ImageCarousel({ images }: ImageCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  if (!images || images.length === 0) return null;

  const prev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrent((current - 1 + images.length) % images.length);
  };
  const next = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrent((current + 1) % images.length);
  };

  return (
    <>
      <div
        className="relative group aspect-video rounded-xl overflow-hidden border border-void-700/50 bg-void-800 cursor-zoom-in"
        onClick={() => setLightbox(true)}
      >
        <img
          src={images[current].src}
          alt={images[current].alt}
          width={1200}
          height={675}
          loading="lazy"
          className="w-full h-full object-contain"
        />

        {/* Zoom hint */}
        <div className="absolute bottom-3 right-3 p-1.5 rounded-lg bg-void-950/70 text-void-300 opacity-0 group-hover:opacity-100 transition-opacity">
          <ZoomIn size={16} />
        </div>

        {images.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-void-950/60 backdrop-blur-sm border border-void-700/40 flex items-center justify-center text-void-300 hover:text-void-50 hover:bg-void-950/80 transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
              aria-label="Previous image"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-void-950/60 backdrop-blur-sm border border-void-700/40 flex items-center justify-center text-void-300 hover:text-void-50 hover:bg-void-950/80 transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
              aria-label="Next image"
            >
              <ChevronRight size={20} />
            </button>

            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
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

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-void-950/90 backdrop-blur-sm p-4 cursor-zoom-out"
          onClick={() => setLightbox(false)}
        >
          <button
            onClick={() => setLightbox(false)}
            className="absolute top-4 right-4 p-2 rounded-full bg-void-800/80 text-void-200 hover:text-white hover:bg-void-700 transition-colors cursor-pointer z-10"
            aria-label="Close"
          >
            <X size={24} />
          </button>

          <img
            src={images[current].src}
            alt={images[current].alt}
            className="max-w-full max-h-[90vh] rounded-xl shadow-2xl object-contain"
            onClick={(e) => { e.stopPropagation(); setLightbox(false); }}
          />

          {/* Lightbox nav arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => prev(e)}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-void-800/80 border border-void-700/40 flex items-center justify-center text-void-200 hover:text-white hover:bg-void-700 transition-colors cursor-pointer"
                aria-label="Previous image"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={(e) => next(e)}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-void-800/80 border border-void-700/40 flex items-center justify-center text-void-200 hover:text-white hover:bg-void-700 transition-colors cursor-pointer"
                aria-label="Next image"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}
