import express from 'express';
import { isAuthenticated } from '../../middlewares/merchant-middlewares/isAuth';
import { CustomRequest } from '../../utils/merchant/CustomRequest';
import prisma from '../../database/db';

const router = express.Router();

// Get all Payment Links
router.get('/', isAuthenticated, async (req: CustomRequest, res, next) => {
    try {
        const paymentLinks = await prisma.paymentLink.findMany({
            where: { merchantId: req.merchantId }
        });
        res.status(200).json({ paymentLinks });
    } catch (error) {
        next(error);
    }
});

// Create a Payment Link (Ensure name is unique)
router.post('/', isAuthenticated, async (req: CustomRequest, res, next) => {
    try {
        const { name, description } = req.body;
                const merchantId=req.merchantId || ''
        const existingPaymentLink = await prisma.paymentLink.findFirst({
            where: { merchantId: merchantId, name }
        });

        if (existingPaymentLink) {
            return res.status(400).json({ message: 'Payment link already exists' });
        }

        const paymentLink = await prisma.paymentLink.create({
            data: {
                name,
                description,
                merchantId: merchantId
            }
        });

        res.status(201).json({ message: 'Payment link created successfully', paymentLink });
    } catch (error) {
        next(error);
    }
});

export { router as PaymentLinkRouter };
