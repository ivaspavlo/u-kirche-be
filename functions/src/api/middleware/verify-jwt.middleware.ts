import { NextFunction, Request, Response } from 'express';
import { ErrorResponseBody } from '../../core/utils/http-response-error';
import { authService, userService } from '../../core/services';
import { IUserRes } from '../../core/interfaces';
import { ERROR_CODE, ROLE } from '../../core/constants';

export const verifyJwtMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = authService.extractBearerToken(req);

    if (!token) {
        req.authenticated = false;
        next();
        return;
    }

    try {
        const decodedToken = await authService.verifyIdToken(token);
        const isGoogleSignIn = decodedToken.firebase.sign_in_provider === 'google.com';

        if (!isGoogleSignIn || !decodedToken.email || !decodedToken.email_verified) {
            throw new Error('A verified Google account is required');
        }

        const user: IUserRes = await userService.getUserByFirebaseIdentity(decodedToken.uid, decodedToken.email);

        req.authenticated = true;
        req.user = user;
        req.claims = {
            authenticated: true,
            admin: user.role === ROLE.ADMIN,
            superadmin: user.role === ROLE.SUPERADMIN
        };

        next();
    } catch {
        req.authenticated = false;
        res.status(401).send(
            new ErrorResponseBody({
                code: ERROR_CODE.UNAUTHORIZED,
                description: 'Invalid credentials'
            })
        );
    }
};
