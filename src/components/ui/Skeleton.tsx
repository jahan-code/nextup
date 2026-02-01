import React from 'react';

interface SkeletonProps {
  className?: string;
  style?: React.CSSProperties;
}

const Skeleton: React.FC<SkeletonProps> = ({ className = '', style }) => (
  <div
    className={`rounded bg-gray-700/50 animate-pulse ${className}`}
    style={style}
    aria-hidden
  />
);

export const SkeletonCard: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div
    className={`bg-gray-800/60 border border-gray-600/30 rounded-xl overflow-hidden ${className}`}
    aria-hidden
  >
    <Skeleton className="h-40 w-full rounded-none" />
    <div className="p-6 space-y-3">
      <Skeleton className="h-5 w-[75%]" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-1/2" />
      <div className="flex gap-4 pt-2">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-16" />
      </div>
    </div>
  </div>
);

export const SkeletonRoomGrid: React.FC<{ count?: number }> = ({ count = 6 }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
);

export const SkeletonStreamCard: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div
    className={`bg-gray-800/60 border border-gray-600/30 rounded-xl overflow-hidden ${className}`}
    aria-hidden
  >
    <Skeleton className="h-48 w-full rounded-none" />
    <div className="p-6 space-y-3">
      <Skeleton className="h-5 w-full" />
      <Skeleton className="h-5 w-[80%]" />
      <div className="flex justify-between pt-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-20" />
      </div>
    </div>
  </div>
);

export const SkeletonPlayer: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div
    className={`relative w-full overflow-hidden rounded-xl bg-gray-800/60 border border-gray-600/30 ${className}`}
    style={{ paddingBottom: '56.25%' }}
    aria-hidden
  >
    <div className="absolute inset-0 flex items-center justify-center">
      <Skeleton className="h-full w-full rounded-none" />
    </div>
  </div>
);

export const SkeletonForm: React.FC = () => (
  <div className="space-y-4" aria-hidden>
    <div>
      <Skeleton className="h-4 w-16 mb-2" />
      <Skeleton className="h-12 w-full rounded-lg" />
    </div>
    <div>
      <Skeleton className="h-4 w-20 mb-2" />
      <Skeleton className="h-12 w-full rounded-lg" />
    </div>
    <Skeleton className="h-12 w-full rounded-lg" />
  </div>
);

export const SkeletonAppbar: React.FC = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-gray-600/20 h-20" aria-hidden>
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-20">
        <Skeleton className="h-8 w-32" />
        <div className="hidden lg:flex gap-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-9 w-24" />
          ))}
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-10 w-20 rounded-lg" />
          <Skeleton className="h-10 w-24 rounded-lg" />
        </div>
      </div>
    </div>
  </nav>
);

export const SkeletonListItem: React.FC = () => (
  <div className="flex items-center gap-4 p-3 rounded-lg" aria-hidden>
    <Skeleton className="h-16 w-24 rounded shrink-0" />
    <div className="flex-1 space-y-2 min-w-0">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-3 w-1/3" />
    </div>
    <Skeleton className="h-8 w-16 rounded" />
  </div>
);

export default Skeleton;
