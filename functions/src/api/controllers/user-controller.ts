import { RequestHandler } from 'express';
import { userService } from '../../core/services';
import { HttpServer } from '../../core/utils';
import { Controller } from '../../core/interfaces';

export class UserController implements Controller {
    initialize(httpServer: HttpServer): void {
        httpServer.post('/user', this.#createUser.bind(this), ['superadmin']);
        httpServer.delete('/user', this.#deleteUser.bind(this), ['superadmin']);
        httpServer.get('/user', this.#getUser.bind(this), ['admin', 'superadmin']);
        httpServer.get('/user/all', this.#getAllUsers.bind(this), ['superadmin']);
    }

    readonly #createUser: RequestHandler = async (req, res, next) => {
        const users = await userService.createUser(req?.body);
        res.send({ users });
        next();
    };

    readonly #deleteUser: RequestHandler = async (req, res, next) => {
        const user = await userService.deleteUser(req?.body?.id);
        res.send({ user });
        next();
    };

    readonly #getUser: RequestHandler = async (req, res, next) => {
        res.send({ user: req.user });
        next();
    };

    readonly #getAllUsers: RequestHandler = async (req, res, next) => {
        const users = await userService.getUsers();
        res.send({ users });
        next();
    };
}
