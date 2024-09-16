import express,{ Request, Response } from 'express';
import 'express-async-errors';
import session from 'express-session';
import helmet from 'helmet';
import { json } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';


//Errors Handling Imports
import { errorHandler } from './middlewares/error-handlers';
import { NotFoundError } from './errors/not-found-error';
import { requestErrHandling } from './errors/request-validation-errors';

//@ Routes Imports
//Merchants
import { MerchantAuthRouter } from './routes/merchant/merchant-auth';
import { MerchantProfileRouter } from './routes/merchant/merchant-profile';
import { StorefrontRouter } from './routes/merchant/merchant-store';
import { ProductRouter } from './routes/merchant/merchant-product';
import { PortfolioRouter } from './routes/merchant/merchant-portfolio';
import { ProjectRouter } from './routes/merchant/merchant-projects';
import { PaymentLinkRouter } from './routes/merchant/merchant-payment-link';
import { MerchantSubscriptionRouter } from './routes/merchant/merchant-subscription';
import { MerchantUsersRouter } from './routes/merchant/merchant-users';
import { StatsRouter } from './routes/merchant/merchant-totals';
//Published store
import { storeRouter } from './routes/store/storeRoutes';


//Principal Admin
import { AdminAuthRouter } from './routes/principal-admin/auth';
import { SubscriptionPlanRouter } from './routes/principal-admin/subscription';
import { AdminRoutes } from './routes/principal-admin/adminRoutes';

//Global Route
import { GlobalRouter } from './routes/merchant/merchant-global';

const app = express();
app.use(cookieParser());
dotenv.config();
const corsOptions = {
  origin: ['http://localhost:3000', 'https://nestsite-app.vercel.app'],
  credentials: true,
  optionSuccessStatus: 200
};
app.use(cors(corsOptions));
          

app.use(json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));


const sessionSecret = process.env.SESSION_SECRET || '';
app.use(
  session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(helmet());


//Merchants

app.use('/api/v1/auth',MerchantAuthRouter);
app.use('/api/v1/merchant',MerchantProfileRouter);
app.use('/api/v1/storefront',StorefrontRouter);
app.use('/api/v1/portfolio',PortfolioRouter);
app.use('/api/v1/', ProductRouter);
app.use('/api/v1/', ProjectRouter);
app.use('/api/v1/global',GlobalRouter)
app.use('/api/v1/stats', StatsRouter);
app.use('/api/v1/payment-links', PaymentLinkRouter);
app.use('/api/v1/merchant',MerchantSubscriptionRouter);
app.use('/api/v1/merchant',MerchantUsersRouter);


app.use('/api/v1',GlobalRouter)
//Published Stores
app.use('/',storeRouter);


//Admin
app.use('/admin', AdminAuthRouter);
app.use('/api/v1/admin', SubscriptionPlanRouter);
app.use('/admin',AdminRoutes)

app.get('/',(req: Request, res: Response)=>{
  res.send(`
  <div style="text-align:center;margin-top:10rem">
    Welcome to nestsite 😜
    <p>
       <a href="https://nestsite.vercel.app">Visit</a>
    <p>
  </div>
  `);
})
app.all('*', async (req: Request, res: Response) => {
  throw new NotFoundError();
});

app.use(errorHandler);
app.use(requestErrHandling);

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`visit nestsite 👉 http://localhost:${PORT}`)
})