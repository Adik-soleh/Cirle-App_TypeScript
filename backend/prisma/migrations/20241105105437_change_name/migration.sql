/*
  Warnings:

  - You are about to drop the `vibes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "likes" DROP CONSTRAINT "likes_targetId_fkey";

-- DropForeignKey
ALTER TABLE "replies" DROP CONSTRAINT "replies_targetId_fkey";

-- DropForeignKey
ALTER TABLE "vibes" DROP CONSTRAINT "vibes_authorId_fkey";

-- DropTable
DROP TABLE "vibes";

-- CreateTable
CREATE TABLE "posts" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "image" TEXT,
    "badLabels" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "authorId" INTEGER NOT NULL,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "replies" ADD CONSTRAINT "replies_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
