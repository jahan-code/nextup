import { Appbar, SkeletonRoomGrid } from '@/src/components';

export default function RoomsLoading() {
  return (
    <div className="min-h-screen bg-black">
      <Appbar />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="h-10 w-56 bg-gray-700/50 rounded animate-pulse mb-2" />
            <div className="h-5 w-80 bg-gray-700/50 rounded animate-pulse" />
          </div>
          <div className="h-12 w-36 bg-gray-700/50 rounded-lg animate-pulse" />
        </div>
        <div className="mb-6">
          <div className="h-12 w-full bg-gray-700/50 rounded-lg animate-pulse" />
        </div>
        <SkeletonRoomGrid />
      </div>
    </div>
  );
}
