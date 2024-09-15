/*
  Warnings:

  - You are about to drop the column `orderId` on the `products` table. All the data in the column will be lost.
  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'DEFAULT');

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_userId_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_orderId_fkey";

-- AlterTable
ALTER TABLE "products" DROP COLUMN "orderId";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'DEFAULT';

-- DropTable
DROP TABLE "Order";

-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL,
    "sreet" TEXT NOT NULL,
    "number" TEXT NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);
