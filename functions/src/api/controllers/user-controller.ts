import { RequestHandler } from 'express';
import { userService } from '../../core/services';
import { ERROR_CODE, KEYS } from '../../core/constants';
import { HttpResponseError, HttpServer } from '../../core/utils';
import { Controller } from '../../core/interfaces';

export class UserController implements Controller {
    initialize(httpServer: HttpServer): void {
        httpServer.post('/user', this.createUser.bind(this), ['superadmin']);
    }

    private readonly createUser: RequestHandler = async (req, res, next) => {
        if (req?.body?.adminKey !== process.env[KEYS.ADMIN_KEY]) {
            throw new HttpResponseError(401, ERROR_CODE.UNAUTHORIZED, 'Invalid credentials');
        }
        const userCreated = await userService.createUser(req?.body);
        res.send({ user: userCreated });
        next();
    };
}
