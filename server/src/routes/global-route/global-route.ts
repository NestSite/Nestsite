import express, { Request, Response, NextFunction } from 'express';
import prisma from '../../database/db';

const router = express.Router();

// Fetch All Subscription Plans
router.get('/subscription-plans', async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Retrieve all subscription plans
      const plans = await prisma.subscriptionPlan.findMany();
  
      res.status(200).json({ plans });
    } catch (error) {
      next(error);
    }
  });
 
export { router as GlobalRouter };
