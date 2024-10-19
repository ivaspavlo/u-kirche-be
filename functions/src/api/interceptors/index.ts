import { Request, Response, NextFunction } from 'express';
import { verifyIdTokenInterceptor } from './verify-idtoken-interceptor';
import bodyParser from 'body-parser';
import cors from 'cors';

export const interceptors: Array<(req:Request,res:Response,next:NextFunction) => void> = [
    bodyParser.urlencoded({ extended: false }),
    bodyParser.json(),
    cors({ origin: true }),
    // Setting default values
    (req, res, next) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        req.claims = {} as any;
        next();
    },
    verifyIdTokenInterceptor
];
