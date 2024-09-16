import express from 'express';
import prisma from '../../database/db'; // Adjust the path to your actual Prisma client initialization

const router = express.Router();

// Get Portfolio by Name and its associated Projects
router.get('/portfolio/:name', async (req, res, next) => {
  try {
    const { name } = req.params;

    // Find the portfolio by name and include its associated projects
    const portfolio = await prisma.portfolio.findFirst({
      where: { fullName: name },
      include: {
        projects: true, // Include the associated projects
      },
    });

    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }

    res.status(200).json(portfolio);
  } catch (error) {
    next(error);
  }
});

// Get Storefront by Name and its associated Products
router.get('/storefront/:name', async (req, res, next) => {
  try {
    const { name } = req.params;

    // Find the storefront by name and include its associated products
    const storefront = await prisma.storefront.findFirst({
      where: { name: name },
      include: {
        categories: {
          include: {
            products: true, // Include products under each category
          },
        },
      },
    });

    if (!storefront) {
      return res.status(404).json({ message: 'Storefront not found' });
    }

    res.status(200).json(storefront);
  } catch (error) {
    next(error);
  }
});

export { router as GlobalRouter };
