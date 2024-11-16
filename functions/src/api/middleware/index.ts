import cors from 'cors';
import bodyParser from 'body-parser';
import { Request, Response, NextFunction } from 'express';
import { defineString } from 'firebase-functions/params';
import { verifyJwtMiddleware } from './verify-jwt.middleware';
import { KEYS } from '../../core/constants';

export const middleware: Array<(req: Request, res: Response, next: NextFunction) => void> = [
    bodyParser.urlencoded({ extended: false }),
    bodyParser.json(),
    cors({
        origin: defineString(KEYS.UI_ORIGIN).value(),
        optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
    }),
    // Setting default values
    (req, _, next) => {
        req.claims = {} as any;
        next();
    },
    verifyJwtMiddleware
];
