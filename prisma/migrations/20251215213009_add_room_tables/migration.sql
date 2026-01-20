-- CreateEnum
CREATE TYPE "RoomMemberRole" AS ENUM ('CREATOR', 'MEMBER');

-- CreateTable
CREATE TABLE "Room" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "isPublic" BOOLEAN NOT NULL DEFAULT true,
    "creatorId" TEXT NOT NULL,
    "currentStreamId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoomMember" (
    "id" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "role" "RoomMemberRole" NOT NULL DEFAULT 'MEMBER',
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RoomMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoomStream" (
    "id" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "streamId" TEXT NOT NULL,
    "addedById" TEXT NOT NULL,
    "addedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "RoomStream_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoomStreamUpvote" (
    "id" TEXT NOT NULL,
    "roomStreamId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RoomStreamUpvote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Room_isPublic_idx" ON "Room"("isPublic");

-- CreateIndex
CREATE INDEX "Room_creatorId_idx" ON "Room"("creatorId");

-- CreateIndex
CREATE INDEX "RoomMember_roomId_idx" ON "RoomMember"("roomId");

-- CreateIndex
CREATE INDEX "RoomMember_userId_idx" ON "RoomMember"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "RoomMember_roomId_userId_key" ON "RoomMember"("roomId", "userId");

-- CreateIndex
CREATE INDEX "RoomStream_roomId_idx" ON "RoomStream"("roomId");

-- CreateIndex
CREATE INDEX "RoomStream_streamId_idx" ON "RoomStream"("streamId");

-- CreateIndex
CREATE UNIQUE INDEX "RoomStream_roomId_streamId_key" ON "RoomStream"("roomId", "streamId");

-- CreateIndex
CREATE INDEX "RoomStreamUpvote_roomStreamId_idx" ON "RoomStreamUpvote"("roomStreamId");

-- CreateIndex
CREATE INDEX "RoomStreamUpvote_userId_idx" ON "RoomStreamUpvote"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "RoomStreamUpvote_roomStreamId_userId_key" ON "RoomStreamUpvote"("roomStreamId", "userId");

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_currentStreamId_fkey" FOREIGN KEY ("currentStreamId") REFERENCES "RoomStream"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomMember" ADD CONSTRAINT "RoomMember_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomMember" ADD CONSTRAINT "RoomMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomStream" ADD CONSTRAINT "RoomStream_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomStream" ADD CONSTRAINT "RoomStream_streamId_fkey" FOREIGN KEY ("streamId") REFERENCES "Stream"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomStream" ADD CONSTRAINT "RoomStream_addedById_fkey" FOREIGN KEY ("addedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomStreamUpvote" ADD CONSTRAINT "RoomStreamUpvote_roomStreamId_fkey" FOREIGN KEY ("roomStreamId") REFERENCES "RoomStream"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomStreamUpvote" ADD CONSTRAINT "RoomStreamUpvote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
