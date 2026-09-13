import cors from 'cors';
import bodyParser from 'body-parser';
import { Request, Response, NextFunction } from 'express';
import { verifyJwtMiddleware } from './verify-jwt.middleware';
import { ENV_KEY } from '../../core/constants';
import rateLimit from 'express-rate-limit';

const uiOrigins = process.env[ENV_KEY.UI_ORIGIN]?.split(',').map((origin) => origin.trim()) ?? [
    'http://localhost:4200',
    'http://127.0.0.1:4200'
];

function getClientKey(req: Request): string {
    const forwardedFor = req.headers['x-forwarded-for'];
    const forwardedAddress = Array.isArray(forwardedFor) ? forwardedFor[0] : forwardedFor?.split(',')[0]?.trim();
    return req.ip ?? req.socket.remoteAddress ?? forwardedAddress ?? 'unknown-client';
}

export const middleware: Array<(req: Request, res: Response, next: NextFunction) => void> = [
    rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // Limit each IP to 100 requests per 15 minutes
        keyGenerator: getClientKey,
        message: 'Too many requests from this IP address, please try again later',
        standardHeaders: true, // Return rate limit info in the 'RateLimit-*' header
        legacyHeaders: false // Disable the 'X-RateLimit-*' headers
    }),
    bodyParser.urlencoded({ extended: false }),
    bodyParser.json(),
    cors({
        origin: uiOrigins,
        optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
    }),
    // Setting default claim values
    (req, _, next) => {
        req.claims = {} as any;
        next();
    },
    verifyJwtMiddleware
];
