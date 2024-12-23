import cors from 'cors';
import bodyParser from 'body-parser';
import { Request, Response, NextFunction } from 'express';
import { verifyJwtMiddleware } from './verify-jwt.middleware';
import { ENV_KEY } from '../../core/constants';

export const middleware: Array<(req: Request, res: Response, next: NextFunction) => void> = [
    bodyParser.urlencoded({ extended: false }),
    bodyParser.json(),
    cors({
        origin: process.env[ENV_KEY.UI_ORIGIN],
        optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
    }),
    // Setting default values
    (req, _, next) => {
        req.claims = {} as any;
        next();
    },
    verifyJwtMiddleware
];
