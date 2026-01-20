-- CreateTable
CREATE TABLE "SkipVote" (
    "id" TEXT NOT NULL,
    "roomStreamId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SkipVote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SkipVote_roomStreamId_idx" ON "SkipVote"("roomStreamId");

-- CreateIndex
CREATE INDEX "SkipVote_userId_idx" ON "SkipVote"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "SkipVote_roomStreamId_userId_key" ON "SkipVote"("roomStreamId", "userId");

-- AddForeignKey
ALTER TABLE "SkipVote" ADD CONSTRAINT "SkipVote_roomStreamId_fkey" FOREIGN KEY ("roomStreamId") REFERENCES "RoomStream"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SkipVote" ADD CONSTRAINT "SkipVote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
