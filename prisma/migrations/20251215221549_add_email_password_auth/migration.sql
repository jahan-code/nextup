-- AlterEnum
ALTER TYPE "Provider" ADD VALUE 'Email';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password" TEXT;
