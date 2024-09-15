import express, { Request, Response, NextFunction } from 'express';
import prisma from '../../database/db';

const router = express.Router();

// Delete All Merchants Route
router.delete('/delete-all-merchants', async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Check if the user making the request is the principal admin


    // Delete all merchants
    await prisma.merchant.deleteMany();

    res.status(200).json({ message: 'All merchants deleted successfully' });
  } catch (error) {
    next(error);
  }
});

export { router as AdminRoutes };
