import { RequestHandler } from 'express';
import { Controller, HttpServer } from './';
import { authService } from '../../core/services/auth.service';

export class AuthController implements Controller {
  initialize(httpServer: HttpServer): void {
    httpServer.post('/auth/login', this.login.bind(this));
  }

  private readonly login: RequestHandler = async (req, res, next) => {
    const jwt = await authService.login(req.body);
    res.send(jwt);
    next();
  }
}
