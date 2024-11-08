import * as admin from 'firebase-admin';
import assert from 'node:assert';
import { logger } from 'firebase-functions';
import { NextFunction, Request, Response } from 'express';
import { MyClaims } from '../../index';

import { ErrorResponseBody } from '../../core/utils/http-response-error';
import { ENV_KEY, ENV_MODE } from '../../core/constants';

const { defineString } = require('firebase-functions/params');
const env = defineString(ENV_KEY.MODE);

const _idToken = (req:Request) => {
    const authorizationHeaderValue:string | undefined =
        (req.headers['Authorization']?.length
            ? req.headers['Authorization']
            : req.headers['authorization'])?.toString();

    if (!authorizationHeaderValue?.length || authorizationHeaderValue.length <= 16) {
        return null;
    }

    if (authorizationHeaderValue?.toLowerCase()?.startsWith('bearer ')) {
        return authorizationHeaderValue.substring('bearer '.length);
    }

    return authorizationHeaderValue;
}

export const verifyIdTokenInterceptor =  ((req: Request, res: Response, next: NextFunction) => {
    const idToken = _idToken(req);

    // TODO: to be removed after development is complete
    if (env.value() === ENV_MODE.LOCAL) {
        req.authenticated = true;
        req.claims!['admin' as MyClaims] = true;
        next();
        return;
    }

    if (!idToken?.length) {
        req.authenticated = false;
        req.claims!['authenticated' as MyClaims] = false;
        next();
        return;
    }

    let finished = false;

    const timeout = setTimeout(() => {
        if (!finished) {
            finished = true;
            logger.error(`Invalid Firebase ID Token on 'Authorization' header (TIMEOUT)`);
            res.status(401).send(new ErrorResponseBody({
                status: 401,
                code: 'UNAUTHORIZED',
                description: 'Invalid Firebase ID Token on `Authorization` header (TIMEOUT)',
            }));
        }
    }, 4000);

    admin.auth().verifyIdToken(idToken, true).then(async (decoded) => {
        if (!finished) {
            finished = true;

            req.authenticated = true;
            req.auth = (await admin.auth().getUser(decoded.uid));
            req.token = decoded;
            req.claims = req.auth!.customClaims ?? {} as any; // same object reference as Firebase
            req.claims['authenticated' as MyClaims] = true;

            assert(req.auth!.customClaims!['authenticated'] === true);
            assert(req.auth !== null);
            assert(req.token !== null);

            next();
        }
        clearTimeout(timeout);
    }, (reason) => {
        logger.error(`Invalid Firebase ID Token on 'Authorization' header: ${reason}`);
        if(!finished) {
            finished = true;
            res.status(401).send(new ErrorResponseBody({
                status: 401,
                code: 'UNAUTHORIZED',
                description: 'Invalid Firebase ID Token on `Authorization` header'
            }));
        }
        clearTimeout(timeout);
    });
});
