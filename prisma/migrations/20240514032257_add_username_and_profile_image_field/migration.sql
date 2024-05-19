/*
  Warnings:

  - Added the required column `profileImage` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "profileImage" TEXT NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL;
