'use client';

import { Skeleton, SkeletonAppbar, SkeletonCard } from '@/src/components';

export default function MarketingSkeleton() {
  return (
    <main className="min-h-screen bg-black">
      <SkeletonAppbar />

      {/* Hero Skeleton */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-black" />
        <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <Skeleton className="h-14 sm:h-16 lg:h-20 w-full max-w-2xl mx-auto mb-4" />
              <Skeleton className="h-14 sm:h-16 lg:h-20 w-3/4 max-w-xl mx-auto" />
            </div>
            <div className="mb-12">
              <Skeleton className="h-6 sm:h-8 w-full max-w-2xl mx-auto" />
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Skeleton className="h-14 w-40 rounded-lg mx-auto sm:mx-0" />
              <Skeleton className="h-14 w-40 rounded-lg mx-auto sm:mx-0" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-gray-800/60 backdrop-blur-sm border border-gray-600/30 rounded-xl p-6"
                  aria-hidden
                >
                  <Skeleton className="h-10 w-10 rounded mx-auto mb-3" />
                  <Skeleton className="h-8 w-20 mx-auto mb-2" />
                  <Skeleton className="h-4 w-24 mx-auto" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Skeleton */}
      <section className="py-24 bg-black relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <Skeleton className="h-12 sm:h-14 lg:h-16 w-80 mx-auto mb-6" />
            <Skeleton className="h-6 w-96 max-w-full mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <SkeletonCard key={i} className="h-full" />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Skeleton */}
      <section className="py-24 bg-black relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <Skeleton className="h-12 sm:h-14 lg:h-16 w-72 mx-auto mb-6" />
            <Skeleton className="h-6 w-80 max-w-full mx-auto" />
          </div>
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <SkeletonCard key={i} className="h-full" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer Skeleton */}
      <footer className="bg-black border-t border-gray-600/30 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <Skeleton className="h-8 w-32" />
            <div className="flex gap-4">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-10 w-10 rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
