import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GoogleStrategy, Profile } from 'passport-google-oauth20';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';

import bcrypt from 'bcrypt';
import prisma from '../database/db';
import { Merchant } from '@prisma/client';
import dotenv from 'dotenv';
dotenv.config();

const googleClientId = process.env.GOOGLE_CLIENTID || '';
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET || '';
const callbackUrl = process.env.CALLBACK_URL || '';
const jwtSecret = process.env.JWT_SECRET_KEY || '';

//Serializing a Merchant
passport.serializeUser((merchant, done) => {
    const typedMerchant = merchant as Merchant;
    done(null, typedMerchant.id);
  });
  
  passport.deserializeUser(async (id, done) => {
    try {
      const merchant = await prisma.merchant.findUnique({ where: { id: parseInt(id as string, 10) } });
      done(null, merchant);
    } catch (error) {
      done(error);
    }
  });
  
passport.use(
    new LocalStrategy(
      { usernameField: 'email' },
      async (email, password, done) => {
        try {
          // Check if the email is associated with a Google account
          const googleMerchant = await prisma.merchant.findUnique({
            where: { googleId: email as string },
          });
          if (googleMerchant) {
            return done(null, false, {
              message: 'Email is already registered with Google.',
            });
          }
  
          // Proceed with local authentication
          const merchant = await prisma.merchant.findUnique({
            where: { email: email as string },
          });
          if (!merchant) {
            return done(null, false, { message: 'Incorrect email or password.' });
          }
          if (!bcrypt.compareSync(password as string, merchant.password || '')) {
            return done(null, false, { message: 'Incorrect email or password.' });
          }
          merchant.role = 'merchant';
          return done(null, merchant);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
  passport.use(
    new GoogleStrategy(
      {
        clientID: googleClientId,
        clientSecret: googleClientSecret,
        callbackURL: callbackUrl,
      },
      async (_accessToken, _refreshToken, profile: Profile, done) => {
        try {
      
          // Check if the email is associated with a password
          const existingMerchant = await prisma.merchant.findFirst({
            where: {
              email: profile.emails && profile.emails[0]?.value,
              NOT: {
                password: null,
              },
            },
          });
  
          if (existingMerchant) {
            return done(null, false, {
              message: 'Email is already registered with a password. Please use password login.',
            });
          }
  
          const existingGoogleMerchant = await prisma.merchant.findUnique({
            where: { googleId: profile.id as string },
          });
  
          if (existingGoogleMerchant) {
            return done(null, existingGoogleMerchant);
          }
  
          const newMerchant = await prisma.merchant.create({
            data: {
              googleId: profile.id as string,
              role: 'merchant',
              email: profile.emails && profile.emails[0]?.value || '',
            },
          });
          return done(null, newMerchant);
        } catch (error:any) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJwt.fromExtractors([req => req.cookies.jwt]),
        secretOrKey: jwtSecret,
      },
      (jwtPayload, done) => {
        if (Date.now() > jwtPayload.expires) {
          return done('jwt expired', false);
        }
  
        return done(null, jwtPayload);
      }
    )
  );
  

export default passport;
