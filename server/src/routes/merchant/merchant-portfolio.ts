import express from 'express';
import { isAuthenticated } from '../../middlewares/merchant-middlewares/isAuth';
import { CustomRequest } from '../../utils/merchant/CustomRequest';
import prisma from '../../database/db';

const router = express.Router();

// Get all Portfolios
router.get('/', isAuthenticated, async (req: CustomRequest, res, next) => {
    try {
        const portfolios = await prisma.portfolio.findMany({
            where: { merchantId: req.merchantId }
        });
        res.status(200).json({ portfolios });
    } catch (error) {
        next(error);
    }
});

// Get a single Portfolio by ID
router.get('/:id', isAuthenticated, async (req: CustomRequest, res, next) => {
    try {
        const { id } = req.params;

        const portfolio = await prisma.portfolio.findFirst({
            where: { id, merchantId: req.merchantId }
        });

        if (!portfolio) {
            return res.status(404).json({ message: 'Portfolio not found' });
        }

        res.status(200).json({ portfolio });
    } catch (error) {
        next(error);
    }
});

// Create a Portfolio
router.post('/', isAuthenticated, async (req: CustomRequest, res, next) => {
    try {
        const { fullName, skill, description, profilePhoto } = req.body;
        const merchantId = req.merchantId || '';

        const existingPortfolio = await prisma.portfolio.findFirst({
            where: { merchantId: merchantId, fullName }
        });

        if (existingPortfolio) {
            return res.status(400).json({ message: 'Portfolio with this name already exists' });
        }

        const portfolio = await prisma.portfolio.create({
            data: {
                fullName,
                skill,
                description,
                profilePhoto,
                merchantId: merchantId
            }
        });

        res.status(201).json({ message: 'Portfolio created successfully', portfolio });
    } catch (error) {
        next(error);
    }
});

// Update a Portfolio
router.put('/:id', isAuthenticated, async (req: CustomRequest, res, next) => {
    try {
        const { id } = req.params;
        const { fullName, skill, description, profilePhoto } = req.body;

        const existingPortfolio = await prisma.portfolio.findFirst({
            where: { merchantId: req.merchantId, fullName, NOT: { id } }
        });

        if (existingPortfolio) {
            return res.status(400).json({ message: 'Portfolio with this name already exists' });
        }

        const portfolio = await prisma.portfolio.update({
            where: { id },
            data: { fullName, skill, description, profilePhoto }
        });

        res.status(200).json({ message: 'Portfolio updated successfully', portfolio });
    } catch (error) {
        next(error);
    }
});

export { router as PortfolioRouter };
