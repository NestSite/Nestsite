import { Request, Response, NextFunction } from 'express';
import tokenCache from './TokenCache';

declare global {
  namespace Express {
    interface Request {
      verificationCode?: string;
      verificationCodeExpiration?: number;
    }
  }
}

export const generateVerificationCode = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    console.log('Generated Verification Code:', verificationCode);
    req.verificationCode = verificationCode;
    tokenCache.set(verificationCode, true, 3600);
    next();
  } catch (error) {
    next(error);
  }
};
