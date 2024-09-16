import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const jwtSecretKey = process.env.JWT_SECRET_KEY || '';


export const generateVerificationToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const merchant = res.locals.merchant;
    const token = jwt.sign({ merchantId: merchant.id }, jwtSecretKey, { expiresIn: '1d' });
    req.verificationToken = token;
    next();
  } catch (error) {
    next(error);
  }
};
