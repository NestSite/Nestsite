/*
  Warnings:

  - You are about to drop the column `storeImg` on the `Portfolio` table. All the data in the column will be lost.
  - Added the required column `coverImg` to the `Portfolio` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Portfolio" DROP COLUMN "storeImg",
ADD COLUMN     "bio" TEXT,
ADD COLUMN     "coverImg" TEXT NOT NULL,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "facebookUrl" TEXT,
ADD COLUMN     "instaUrl" TEXT,
ADD COLUMN     "linkedInUrl" TEXT,
ADD COLUMN     "portfolioImg" TEXT,
ADD COLUMN     "productsUrl" TEXT,
ADD COLUMN     "tiktokUrl" TEXT,
ADD COLUMN     "twitterUrl" TEXT,
ADD COLUMN     "youtubeUrl" TEXT;

-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "portfolioId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "liveLink" TEXT,
    "imageUrl" TEXT,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SliderSection" (
    "id" SERIAL NOT NULL,
    "portfolioId" INTEGER NOT NULL,
    "header" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SliderSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Slide" (
    "id" SERIAL NOT NULL,
    "sliderSectionId" INTEGER NOT NULL,
    "caption" TEXT NOT NULL,
    "altText" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "liveLink" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Slide_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GallerySection" (
    "id" SERIAL NOT NULL,
    "portfolioId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GallerySection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GalleryImage" (
    "id" SERIAL NOT NULL,
    "gallerySectionId" INTEGER NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "caption" TEXT NOT NULL,
    "altText" TEXT NOT NULL,
    "link" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GalleryImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "Portfolio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SliderSection" ADD CONSTRAINT "SliderSection_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "Portfolio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Slide" ADD CONSTRAINT "Slide_sliderSectionId_fkey" FOREIGN KEY ("sliderSectionId") REFERENCES "SliderSection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GallerySection" ADD CONSTRAINT "GallerySection_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "Portfolio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GalleryImage" ADD CONSTRAINT "GalleryImage_gallerySectionId_fkey" FOREIGN KEY ("gallerySectionId") REFERENCES "GallerySection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
