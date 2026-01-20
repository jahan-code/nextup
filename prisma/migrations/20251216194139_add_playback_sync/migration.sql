-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "isPlaying" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "lastSyncTime" TIMESTAMP(3),
ADD COLUMN     "playbackTime" DOUBLE PRECISION;
