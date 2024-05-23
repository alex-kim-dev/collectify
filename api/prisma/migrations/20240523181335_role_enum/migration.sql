/*
  Warnings:

  - Changed the type of `name` on the `Role` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'USER');

-- Manual cast role name from string to enum
ALTER TABLE "Role"
  ALTER COLUMN "name" TYPE "UserRole" USING "name"::"UserRole";
