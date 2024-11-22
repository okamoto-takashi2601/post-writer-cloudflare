/*
  Warnings:

  - You are about to drop the column `expries` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the column `expries` on the `verification_tokens` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "sessions" DROP COLUMN "expries",
ADD COLUMN     "expires" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "verification_tokens" DROP COLUMN "expries",
ADD COLUMN     "expires" TIMESTAMP(3);
