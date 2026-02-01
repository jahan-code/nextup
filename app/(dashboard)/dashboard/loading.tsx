import { Appbar, SkeletonRoomGrid } from '@/src/components';

export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-black">
      <Appbar />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="h-10 w-48 bg-gray-700/50 rounded animate-pulse mb-3" />
          <div className="h-6 w-72 bg-gray-700/50 rounded animate-pulse mb-4" />
          <div className="flex justify-end mb-4">
            <div className="h-12 w-32 bg-gray-700/50 rounded-lg animate-pulse" />
          </div>
        </div>
        <div className="mb-8">
          <div className="h-8 w-48 bg-gray-700/50 rounded animate-pulse mb-6" />
          <SkeletonRoomGrid />
        </div>
      </div>
    </div>
  );
}
