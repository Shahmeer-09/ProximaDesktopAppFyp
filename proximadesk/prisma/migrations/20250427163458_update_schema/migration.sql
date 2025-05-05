/*
  Warnings:

  - A unique constraint covering the columns `[source,userId]` on the table `Video` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Video_source_userId_key" ON "Video"("source", "userId");
