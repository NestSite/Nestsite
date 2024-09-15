import express from 'express';
import { isAuthenticated } from '../../middlewares/merchant-middlewares/isAuth';
import { CustomRequest } from '../../utils/merchant/CustomRequest';
import prisma from '../../database/db';

const router = express.Router();

// Get all Products by Storefront
router.get('/:storefrontId/products', isAuthenticated, async (req: CustomRequest, res, next) => {
    try {
        const { storefrontId } = req.params;
        const products = await prisma.product.findMany({
            where: { category: { storefrontId } } // Assuming categories are linked to storefront
        });
        res.status(200).json({ products });
    } catch (error) {
        next(error);
    }
});
// Create a Category
router.post('/:storefrontId/categories', isAuthenticated, async (req: CustomRequest, res, next) => {
  try {
      const { storefrontId } = req.params;
      const { name } = req.body;

      // Check if category with the same name already exists for the storefront
      const existingCategory = await prisma.category.findFirst({
          where: { storefrontId, name }
      });

      if (existingCategory) {
          return res.status(400).json({ message: 'Category with this name already exists' });
      }

      const category = await prisma.category.create({
          data: {
              name,
              storefrontId
          }
      });

      res.status(201).json({ message: 'Category created successfully', category });
  } catch (error) {
      next(error);
  }
});
// Get all Categories by Storefront
router.get('/:storefrontId/categories', isAuthenticated, async (req: CustomRequest, res, next) => {
  try {
      const { storefrontId } = req.params;

      // Fetch all categories for the specified storefront
      const categories = await prisma.category.findMany({
          where: { storefrontId },
      });

      res.status(200).json({ categories });
  } catch (error) {
      next(error);
  }
});


// Create a Product
router.post('/:storefrontId/products', isAuthenticated, async (req: CustomRequest, res, next) => {
  try {
      const { name, productImageUrl, price, description, categoryId } = req.body;

      const product = await prisma.product.create({
          data: {
              name,
              productImageUrl,
              price,
              description,
              categoryId,
              
          }
      });

      res.status(201).json({ message: 'Product created successfully', product });
  } catch (error) {
      next(error);
  }
});

// Update a Product
router.put('/:storefrontId/products/:productId', isAuthenticated, async (req: CustomRequest, res, next) => {
    try {
        const { productId } = req.params;
        const { name, productImageUrl, price, description, categoryId } = req.body;

        const existingProduct = await prisma.product.findUnique({
            where: { id: productId }
        });

        if (!existingProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const updatedProduct = await prisma.product.update({
            where: { id: productId },
            data: {
                name,
                productImageUrl,
                price,
                description,
                categoryId
            }
        });

        res.status(200).json({ message: 'Product updated successfully', updatedProduct });
    } catch (error) {
        next(error);
    }
});

// Delete a Product
router.delete('/:storefrontId/products/:productId', isAuthenticated, async (req: CustomRequest, res, next) => {
    try {
        const { productId } = req.params;

        const existingProduct = await prisma.product.findUnique({
            where: { id: productId }
        });

        if (!existingProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        await prisma.product.delete({
            where: { id: productId }
        });

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        next(error);
    }
});

export { router as ProductRouter };
