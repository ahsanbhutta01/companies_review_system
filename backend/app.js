import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'
import mongoSanitize from 'express-mongo-sanitize'
import {globalErrorHanlder} from './controllers/error.controller.js'
import AppError from './utils/appError.js'
import companyRoutes from './routes/companyRoute.js'
import reviewRoutes from './routes/reviewRoutes.js'

// origin: ['http://localhost:3000'],

export const app = express();
app.use(helmet());
app.use(
   cors({
      origin:['https://companies-review-systemfrontend.vercel.app'],
      credentials: true
   })
);

const Limiter = rateLimit({
   windowMs: 60*60*1000,
   max: 300,
   message: "Too many request from this IP, please try again in one hour",
   standardHeaders: true,
   legacyHeaders: false
})

app.use('/api',Limiter);
if(process.env.NODE_ENV === 'development'){
   app.use(morgan('dev'))
}

app.use(express.json({limit: '10kb'}))
app.use((req, res, next)=>{
   mongoSanitize.sanitize(req.body);
   mongoSanitize.sanitize(req.params);

   const queryCopy = {...req.query}
   mongoSanitize.sanitize(queryCopy);

   req.querySanitized = queryCopy;
   next()
})

app.use('/api/v1/companies', companyRoutes)
app.use('/api/v1/reviews', reviewRoutes)

app.use((req, res, next)=>{
   next(new AppError(`Can't find ${req.originalUrl} on this server`, 404))
})

app.use(globalErrorHanlder)
