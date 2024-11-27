import * as logger from 'firebase-functions/logger';
import { Express, NextFunction, Request, RequestHandler, Response } from 'express';
import { ErrorResponseBody, HttpResponseError } from './http-response-error';
import { TClaim } from '../models/user/user.interface';
import { ERROR_CODE } from '../constants';

export class HttpServer {
    constructor(public readonly express: Express) {}

    get(path: string, requestHandler: RequestHandler, claims?: TClaim[]): void {
        this.express.get(path, this.#catchErrorHandler(requestHandler, claims));
    }

    post(path: string, requestHandler: RequestHandler, claims?: TClaim[]): void {
        this.express.post(path, this.#catchErrorHandler(requestHandler, claims));
    }

    delete(path: string, requestHandler: RequestHandler, claims?: TClaim[]): void {
        this.express.delete(path, this.#catchErrorHandler(requestHandler, claims));
    }

    put(path: string, requestHandler: RequestHandler, claims?: TClaim[]): void {
        this.express.put(path, this.#catchErrorHandler(requestHandler, claims));
    }

    #checkClaims = (req: Request, claims?: TClaim[]) => {
        // It means no auth required
        if (!claims?.length) {
            return;
        }
        const isAllowed = !!claims.find((c) => req.claims[c]);
        if (!isAllowed) {
            throw new HttpResponseError(403, ERROR_CODE.FORBIDDEN, 'Access not authorized for this role');
        }
    };

    readonly #catchErrorHandler = (requestHandler: RequestHandler, claims?: TClaim[]) => {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                this.#checkClaims(req, claims);
                await Promise.resolve(requestHandler(req, res, next));
            } catch (error: any) {
                logger.error(`[${req.method.toUpperCase()}] ${req.path} ${error}`);

                if (error instanceof HttpResponseError) {
                    res.status(error.status).send(
                        new ErrorResponseBody({
                            code: error.code,
                            description: error.description
                        })
                    );
                    return;
                }

                res.statusCode = 500;
                res.send(
                    new ErrorResponseBody({
                        code: ERROR_CODE.INTERNAL_ERROR,
                        description: 'An internal error occurred, please contact support'
                    })
                );
                next();
            }
        };
    };
}
