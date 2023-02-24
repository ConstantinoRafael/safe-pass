/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `credentials` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "credentials_title_key" ON "credentials"("title");
