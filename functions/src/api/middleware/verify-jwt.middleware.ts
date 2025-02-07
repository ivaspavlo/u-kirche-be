import { NextFunction, Request, Response } from 'express';
import { ErrorResponseBody } from '../../core/utils/http-response-error';
import { authService, userService } from '../../core/services';
import { IUserRes } from '../../core/interfaces';
import { ERROR_CODE, ROLE } from '../../core/constants';

export const verifyJwtMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const jwt = authService.extractJwt(req);

    if (!jwt?.length) {
        req.authenticated = false;
        next();
        return;
    }

    const isValid = authService.verifyJwt(jwt);

    if (!isValid) {
        res.status(401).send(
            new ErrorResponseBody({
                code: ERROR_CODE.UNAUTHORIZED,
                description: 'Invalid credentials'
            })
        );
        return;
    }

    const parsedJwt = authService.parseJwt(jwt);

    if (!parsedJwt) {
        res.status(401).send(
            new ErrorResponseBody({
                code: ERROR_CODE.UNAUTHORIZED,
                description: 'Invalid credentials'
            })
        );
    }

    const user: IUserRes = await userService.getUserById(parsedJwt.id);

    req.authenticated = true;
    req.user = user;
    req.claims = {
        admin: user.role === ROLE.ADMIN,
        superadmin: user.role === ROLE.SUPERADMIN
    };

    req.next();
};
