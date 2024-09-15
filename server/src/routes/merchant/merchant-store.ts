import express from 'express';
import { isAuthenticated } from '../../middlewares/merchant-middlewares/isAuth';
import { CustomRequest } from '../../utils/merchant/CustomRequest';
import prisma from '../../database/db';

const router = express.Router();

// Get all Storefronts
router.get('/', isAuthenticated, async (req: CustomRequest, res, next) => {
    try {
        const storefronts = await prisma.storefront.findMany({
            where: { merchantId: req.merchantId }
        });
        res.status(200).json({ storefronts });
    } catch (error) {
        next(error);
    }
});

// Get a specific Storefront by ID
router.get('/:storefrontId', isAuthenticated, async (req: CustomRequest, res, next) => {
    try {
        const { storefrontId } = req.params;
        const storefront = await prisma.storefront.findFirst({
            where: { id: storefrontId, merchantId: req.merchantId }
        });

        if (!storefront) {
            return res.status(404).json({ message: 'Storefront not found' });
        }

        res.status(200).json({ storefront });
    } catch (error) {
        next(error);
    }
});

// Create a Storefront
router.post('/', isAuthenticated, async (req: CustomRequest, res, next) => {
    try {
        const { name, imageUrl, description } = req.body;
        const merchantId = req.merchantId || '';

        // Check if storefront name already exists for the merchant
        const existingStorefront = await prisma.storefront.findFirst({
            where: { merchantId: merchantId, name }
        });

        if (existingStorefront) {
            return res.status(400).json({ message: 'Storefront with this name already exists' });
        }

        const storefront = await prisma.storefront.create({
            data: {
                name,
                imageUrl,
                description,
                merchantId: merchantId
            }
        });

        res.status(201).json({ message: 'Storefront created successfully', storefront });
    } catch (error) {
        next(error);
    }
});

// Update a Storefront
router.put('/:id', isAuthenticated, async (req: CustomRequest, res, next) => {
    try {
        const { id } = req.params;
        const { name, imageUrl, description } = req.body;

        const existingStorefront = await prisma.storefront.findFirst({
            where: { merchantId: req.merchantId, name, NOT: { id } }
        });

        if (existingStorefront) {
            return res.status(400).json({ message: 'Storefront with this name already exists' });
        }

        const storefront = await prisma.storefront.update({
            where: { id },
            data: { name, imageUrl, description }
        });

        res.status(200).json({ message: 'Storefront updated successfully', storefront });
    } catch (error) {
        next(error);
    }
});

export { router as StorefrontRouter };
