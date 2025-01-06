import cors from 'cors';
import bodyParser from 'body-parser';
import { Request, Response, NextFunction } from 'express';
import { verifyJwtMiddleware } from './verify-jwt.middleware';
import { ENV_KEY } from '../../core/constants';
import rateLimit from 'express-rate-limit';

export const middleware: Array<(req: Request, res: Response, next: NextFunction) => void> = [
    rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // Limit each IP to 100 requests per 15 minutes
        message: 'Too many requests from this IP address, please try again later',
        standardHeaders: true, // Return rate limit info in the 'RateLimit-*' header
        legacyHeaders: false // Disable the 'X-RateLimit-*' headers
    }),
    bodyParser.urlencoded({ extended: false }),
    bodyParser.json(),
    cors({
        origin: process.env[ENV_KEY.UI_ORIGIN],
        optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
    }),
    // Setting default claim values
    (req, _, next) => {
        req.claims = {} as any;
        next();
    },
    verifyJwtMiddleware
];
