import { Appbar, SkeletonPlayer, SkeletonStreamCard } from '@/src/components';

export default function StreamsLoading() {
  return (
    <div className="min-h-screen bg-black">
      <Appbar />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="h-10 w-40 bg-gray-700/50 rounded animate-pulse mb-2" />
          <div className="h-5 w-80 bg-gray-700/50 rounded animate-pulse" />
        </div>
        <div className="mb-12">
          <SkeletonPlayer className="mb-6" />
        </div>
        <div>
          <div className="h-8 w-36 bg-gray-700/50 rounded animate-pulse mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonStreamCard key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
