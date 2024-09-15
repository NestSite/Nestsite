import express, { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import passport from '../../config/passport-config';
import prisma from '../../database/db';
import { body, validationResult } from 'express-validator';
import { generateVerificationCode } from '../../utils/merchant/generateVerificationCode';
import { sendVerificationCode } from '../../utils/merchant/sendVerificationCode';
import nodemailer from 'nodemailer';
import tokenCache from '../../utils/merchant/TokenCache';
import { sendWelcomeEmail } from '../../utils/merchant/sendWelcomeEmail';


const router = express.Router();

const jwtSecretKey = process.env.JWT_SECRET_KEY || '';


const registrationValidation = [
  body('email').isEmail().withMessage('Invalid email format'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.SMTP_USER as string,
    pass: process.env.SMTP_PASS as string,
  },
});
router.post(
  '/register',
  registrationValidation,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      let { email, password, username } = req.body;
      email = email.toLowerCase();

      // Check if the email is already registered with Google
      const googleMerchant = await prisma.merchant.findFirst({
        where: {
          email: email as string,
          NOT: {
            googleId: null,
          },
        },
      });

      // Check if the email is already registered
      const existingMerchant = await prisma.merchant.findUnique({
        where: { email },
      });

      if (googleMerchant) {
        return res.status(401).json({
          message: 'Email is registered with Google. Please login with Google.',
        });
      } else if (existingMerchant) {
        return res.status(401).json({
          message: 'Email already registered',
        });
      }

      if (username) {
        const existingUsername = await prisma.merchant.findFirst({
          where: { username },
        });

        if (existingUsername) {
          return res.status(401).json({
            message: 'Username already taken',
          });
        }
      }

      const defaultPlanId = '665d1aca3791a5c53a3502c2'; // Assuming this is your default subscription plan ID

      // Create a new merchant
      const newMerchant = await prisma.merchant.create({
        data: {
          username: username || null, // Set the username field
          email,
          password: await bcrypt.hash(password, 10),
          role: 'merchant',
          emailVerified: false,
          subscriptionPlanId: defaultPlanId,
        },
      });

      res.locals.merchant = newMerchant;
      next();
    } catch (error) {
      next(error);
    }
  },
  generateVerificationCode,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newMerchant = res.locals.merchant;
      const verificationCode: string = req.verificationCode ?? '';
      await sendVerificationCode(newMerchant.email, verificationCode);

      res.status(201).json({ 
        newMerchant, 
        message: 'Merchant registered successfully. Check your email for your verification code.' 
      });
    } catch (error) {
      next(error);
    }
  }
);



// Verification Route
router.post('/verify-code', async (req: Request, res: Response, next: NextFunction) => {
  try {
    let { email, verificationCode } = req.body;
    email = email.toLowerCase();
    const merchant = await prisma.merchant.findUnique({
      where: { email },
    });
    if (!merchant) {
      return res.status(404).json({ message: 'Merchant not found' });
    }
    if (merchant.emailVerified) {
      return res.status(400).json({ message: 'Email already verified' });
    }
    const isTokenValid = checkIfVerficationCodeIsValid(verificationCode);
    if (!isTokenValid) {
      return res.status(400).json({ message: 'Invalid or expired verification code' });
    }

    tokenCache.del(verificationCode);
    const updatedMerchant = await prisma.merchant.update({
      where: { id: merchant.id },
      data: { emailVerified: true },
    });

    await sendWelcomeEmail(email);

      return res.status(200).json({
        message: 'Email verified successfully',
        merchant: updatedMerchant,
      });
    } catch (error) {
      next(error);
    }
});

// Forgot Password Route
router.post('/forgot-password', async (req: Request, res: Response, next: NextFunction) => {
  try {
    let { email } = req.body;
    email = email.toLowerCase();
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const existingMerchant = await prisma.merchant.findUnique({ where: { email } });
    if (!existingMerchant) {
      return res.status(401).json({ message: 'Email not found' });
    }

    const resetToken = jwt.sign({ merchantId: existingMerchant.id }, jwtSecretKey, {
      expiresIn: '1h', 
    });
    tokenCache.set(resetToken, true, 3600); 
    const mailOptions: nodemailer.SendMailOptions = {
      from: 'Nestsite Technologies <support@nestsite.io>',
      to: email,
      subject: '🔐 Password Reset',
      html: `
      <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; background-color: #f4f4f4;">
       <div style="max-width: 600px; margin: auto; background: white; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <h2 style="color: #333;">🔐 Password Reset</h2>
        <p style="font-size: 18px; color: #666;">You've requested a password reset. Please click the link below to reset your password:</p>
        https://nestsite-app.vercel.app/auth/reset-password?resetToken=${resetToken}"
        <p style="font-size: 14px; color: #999;">If you did not request this reset, please ignore this email.</p>
        <p style="font-size: 14px; color: #999;">Thank you, <br> The Nestsite Team</p>
      </div>
    </div>`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ message: 'Failed to send password reset email' });
      }
      console.log('Password reset email sent:', info.response);
      res.status(200).json({ message: 'Password reset email sent. Check your email for instructions.' });
    });
  } catch (error) {
    next(error);
  }
});

// Reset Password Route
router.post('/reset-password', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token, password } = req.body;
    const decodedToken: any = jwt.verify(token, jwtSecretKey);
    const merchantId = decodedToken.merchantId;

    const isTokenValid = checkIfResetTokenIsValid(token);
    if (!isTokenValid) {
      return res.status(400).json({ message: 'Invalid or expired reset token' });
    }
    const updatedMerchant = await prisma.merchant.update({
      where: { id: merchantId },
      data: { password: await bcrypt.hash(password, 10) },
    });
    removeResetToken(token);
    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    next(error);
  }
});

function checkIfResetTokenIsValid(token: string): boolean {
  return tokenCache.has(token);
}
function checkIfVerficationCodeIsValid(code: string): boolean {
  return tokenCache.has(code);
}

function removeResetToken(token: string): void {
  tokenCache.del(token);
}


router.get('/verify/:token', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.params.token;
    const decodedToken: any = jwt.verify(token, jwtSecretKey);
    const merchantId = decodedToken.merchantId;

    await prisma.merchant.update({
      where: { id: merchantId },
      data: { emailVerified: true },
    });
    res.redirect(`${process.env.CLIENT_DASHBOARD_URL}`);
  } catch (error) {
    next(error);
  }
});


// Login Route
router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  try {
    let { email, password } = req.body;
    email = email.toLowerCase();
    const merchant = await prisma.merchant.findUnique({
      where: { email },
    });
    if (!merchant) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    if (merchant.password !== null && (await bcrypt.compare(password, merchant.password))) {
      const payload = {
        merchantId: merchant.id, 
        expires: Date.now() + parseInt("7000"),
      };
   
      const token = jwt.sign(JSON.stringify(payload), jwtSecretKey);
      // res.cookie('nestsiteAuthToken', token, {
      //   httpOnly: true,
      //   secure: process.env.NODE_ENV === 'production',
      //   sameSite: 'strict',
      // });
      return res.status(200).json({ token, merchant });
    }
    return res.status(400).json({ error: 'Incorrect email or password' });
  } catch (error) {
    next(error);
  }
});

router.use("/logout", (req: Request, res: Response, next: NextFunction) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect(`${process.env.CLIENT_URL}/login`);
  });
});

export { router as MerchantAuthRouter };
