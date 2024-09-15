/*
  Warnings:

  - Added the required column `maxPortfolio` to the `SubscriptionPlan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maxPortfolioTheme` to the `SubscriptionPlan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SubscriptionPlan" ADD COLUMN     "maxPortfolio" INTEGER NOT NULL,
ADD COLUMN     "maxPortfolioTheme" INTEGER NOT NULL;
