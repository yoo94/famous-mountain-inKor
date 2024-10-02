/*
  Warnings:

  - A unique constraint covering the columns `[userEmail,providerAccountId]` on the table `Account` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Account_userEmail_providerAccountId_key" ON "Account"("userEmail", "providerAccountId");
