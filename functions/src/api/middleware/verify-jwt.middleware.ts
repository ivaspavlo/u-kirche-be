import { NextFunction, Request, Response } from 'express';
import { ErrorResponseBody } from '../../core/utils/http-response-error';
import { authService } from '../../core/services/auth.service';
import { userService } from '../../core/services/user.service';
import { IUserRes } from '../../core/models/user/user.interface';
import { ROLE } from '../../core/constants';

export const verifyJwtMiddleware = (async (req: Request, res: Response, next: NextFunction) => {
    const jwt = authService.extractJwt(req);

    if (!jwt?.length) {
        req.authenticated = false;
        next();
        return;
    }

    const isValid = authService.verifyJwt(jwt);

    if (!isValid) {
        res.status(401).send(new ErrorResponseBody({
            status: 401,
            code: 'UNAUTHORIZED',
            description: 'Invalid JWT',
        }));
    }

    const parsedJwt = authService.parseJwt(jwt);
    if (!parsedJwt) {
        res.status(401).send(new ErrorResponseBody({
            status: 401,
            code: 'UNAUTHORIZED',
            description: 'Invalid JWT',
        }));
    }

    const user: IUserRes = await userService.getUserById(parsedJwt.id);

    req.authenticated = true;
    req.claims = {
        admin: user.role === ROLE.ADMIN,
        superadmin: user.role === ROLE.SUPERADMIN
    };

    req.next();
});
