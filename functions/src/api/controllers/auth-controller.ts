import { RequestHandler } from 'express';
import { authService } from '../../core/services';
import { Controller } from '../../core/interfaces';
import { HttpServer } from '../../core/utils/http-server';

export class AuthController implements Controller {
    initialize(httpServer: HttpServer): void {
        httpServer.post('/auth/login', this.login.bind(this));
    }

    private readonly login: RequestHandler = async (req, res, next) => {
        res.send(await authService.login(req.body));
        next();
    };
}
