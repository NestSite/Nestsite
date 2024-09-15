import express from 'express';
import { isAuthenticated } from '../../middlewares/merchant-middlewares/isAuth';
import { CustomRequest } from '../../utils/merchant/CustomRequest';
import prisma from '../../database/db';

const router = express.Router();

// Get total counts for portfolios, projects, products, storefronts, and payment links
router.get('/totals', isAuthenticated, async (req: CustomRequest, res, next) => {
    try {
        const merchantId = req.merchantId || '';

        // Count total portfolios
        const totalPortfolios = await prisma.portfolio.count({
            where: { merchantId: merchantId }
        });

        // Count total projects
        const totalProjects = await prisma.project.count({
            where: { portfolio: { merchantId: merchantId } }
        });

        // Count total products
        const totalProducts = await prisma.product.count({
            where: { category: { storefront: { merchantId: merchantId } } }
        });

        // Count total storefronts
        const totalStorefronts = await prisma.storefront.count({
            where: { merchantId: merchantId }
        });

        // Count total payment links
        const totalPaymentLinks = await prisma.paymentLink.count({
            where: { merchantId: merchantId }
        });

        // Return all counts as a response
        res.status(200).json({
            totals: {
                portfolios: totalPortfolios,
                projects: totalProjects,
                products: totalProducts,  // Added this
                storefronts: totalStorefronts,
                paymentLinks: totalPaymentLinks
            }
        });
    } catch (error) {
        next(error);
    }
});

export { router as StatsRouter };
