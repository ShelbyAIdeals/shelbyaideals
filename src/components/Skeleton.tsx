'use client';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'card';
}

export default function Skeleton({ className = '', variant = 'rectangular' }: SkeletonProps) {
  const baseClasses = 'animate-pulse bg-void-800/60';

  const variantClasses = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
    card: 'rounded-xl',
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`} />
  );
}

export function ReviewCardSkeleton() {
  return (
    <div className="card-elevated overflow-hidden">
      <div className="aspect-video bg-void-800/60 animate-pulse" />
      <div className="p-5 sm:p-6 space-y-3">
        <div className="flex items-center justify-between">
          <Skeleton variant="text" className="w-20 h-5" />
          <Skeleton variant="circular" className="w-10 h-10" />
        </div>
        <Skeleton variant="text" className="w-3/4 h-5" />
        <Skeleton variant="text" className="w-full h-4" />
        <Skeleton variant="text" className="w-2/3 h-4" />
        <Skeleton variant="text" className="w-24 h-4 mt-2" />
      </div>
    </div>
  );
}

export function CategoryCardSkeleton() {
  return (
    <div className="card overflow-hidden p-5">
      <div className="flex items-start gap-4">
        <Skeleton variant="circular" className="w-12 h-12 shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton variant="text" className="w-2/3 h-5" />
          <Skeleton variant="text" className="w-full h-4" />
          <Skeleton variant="text" className="w-1/2 h-4" />
        </div>
      </div>
    </div>
  );
}
