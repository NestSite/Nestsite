import express, { Request, Response, NextFunction } from 'express';
import prisma from '../../database/db';

const router = express.Router();


// // Define a new route to get the number of users under a particular store
// router.get('/store/:storeId/users/count', isAuthenticated, async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const merchantId = (req.user as { id: number }).id; // Assuming req.user contains id property
//       const { storeId } = req.params;
  
//       // Check if the requested store belongs to the merchant
//       const store = await prisma.store.findFirst({
//         where: {
//           id: parseInt(storeId),
//           merchantId,
//         },
//       });
//       if (!store) {
//         return res.status(403).json({ error: 'Access denied' });
//       }
  
//       // Count the number of users under the store
//       const userCount = await prisma.user.count({ where: {  } });
  
//       res.status(200).json({ userCount });
//     } catch (error) {
//       next(error);
//     }
//   });
  
//   // Other merchant-related routes
  
  export { router as MerchantUsersRouter };
  