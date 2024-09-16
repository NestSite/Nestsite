import { Request as ExpressRequest, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface CustomRequest extends ExpressRequest {
  merchantId?: string;
}

const jwtSecretKey = process.env.JWT_SECRET_KEY || '';

export const isAuthenticated = (req: CustomRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1] || req.cookies.jwt;

  if (!req.headers.authorization && !req.cookies.jwt) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  jwt.verify(token, jwtSecretKey, (err: any, decoded: any) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
    if (decoded && decoded.merchantId) {
      req.user = decoded;
      req.merchantId = decoded.merchantId;
    }

    next();
  });
};
