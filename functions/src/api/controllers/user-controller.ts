import { RequestHandler } from 'express';
import { userService } from '../../core/services';
import { ERROR_CODE, KEYS } from '../../core/constants';
import { HttpResponseError, HttpServer } from '../../core/utils';
import { Controller } from '../../core/interfaces';

export class UserController implements Controller {
    initialize(httpServer: HttpServer): void {
        httpServer.post('/user', this.#createUser.bind(this), ['superadmin']);
        httpServer.delete('/user', this.#deleteUser.bind(this), ['superadmin']);
        httpServer.get('/user', this.#getUser.bind(this), ['superadmin']);
    }

    readonly #createUser: RequestHandler = async (req, res, next) => {
        this.#verifyAdminKey(req?.body?.adminKey);
        const user = await userService.createUser(req?.body);
        res.send({ user });
        next();
    };

    readonly #deleteUser: RequestHandler = async (req, res, next) => {
        this.#verifyAdminKey(req?.body?.adminKey);
        const user = await userService.deleteUser(req?.body?.id);
        res.send({ user });
        next();
    }

    readonly #getUser: RequestHandler = async (_, res, next) => {
        const users = await userService.getUsers();
        res.send({ users });
        next();
    }

    #verifyAdminKey(key: string): void {
        if (key !== process.env[KEYS.ADMIN_KEY]) {
            throw new HttpResponseError(401, ERROR_CODE.UNAUTHORIZED, 'Invalid credentials');
        }
    }
}
