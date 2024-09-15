import express, { Request, Response, NextFunction } from 'express';
import prisma from '../../database/db';
const router = express.Router();

router.get('/subscription-plans', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const subscriptionPlans = await prisma.subscriptionPlan.findMany();
    res.status(200).json({ subscriptionPlans });
  } catch (error) {
    next(error);
  }
});



router.post('/subscription-plan', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      name,
      price,
      maxStores,
      maxProductsPerStore,
      maxStoreThemes,
      maxPortfolio,
      maxPortfolioTheme,
      noInventoryLocations,
      transactionFeePercent,
      productCommission,
      allowsCustomDomain,
    } = req.body;
    const existingPlan = await prisma.subscriptionPlan.findUnique({
      where: { name },
    });

    if (existingPlan) {
      return res.status(400).json({ error: 'Subscription plan with the same name already exists' });
    }
    const newPlan = await prisma.subscriptionPlan.create({
      data: {
        name,
        price,
        maxStores,
        maxProductsPerStore,
        maxStoreThemes,
        maxPortfolio,
        maxPortfolioTheme,
        noInventoryLocations,
        transactionFeePercent,
        productCommission,
        allowsCustomDomain,
      },
    });

    res.status(201).json({ message: 'Subscription plan created successfully', plan: newPlan });
  } catch (error) {
    next(error);
  }
});





// Update a Subscription Plan
router.put('/subscription-plan/:planId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { planId } = req.params;
    const {
      name,
      price,
      maxStores,
      maxProductsPerStore,
      maxStoreThemes,
      maxPortfolio,
      maxPortfolioTheme,
      noInventoryLocations,
      transactionFeePercent,
      productCommission,
      allowsCustomDomain,
    } = req.body;
    const updatedPlan = await prisma.subscriptionPlan.update({
      where: { id: planId }, 
      data: {
        name,
        price,
        maxStores,
        maxProductsPerStore,
        maxStoreThemes,
        maxPortfolio,
        maxPortfolioTheme,
        noInventoryLocations,
        transactionFeePercent,
        productCommission,
        allowsCustomDomain,
      },
    });

    res.status(200).json({ message: 'Subscription plan updated successfully', plan: updatedPlan });
  } catch (error) {
    next(error);
  }
});

export { router as SubscriptionPlanRouter };
