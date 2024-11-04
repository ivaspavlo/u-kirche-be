import { RequestHandler } from 'express';
import { Controller, HttpServer } from '../';
import { userService } from '../../../core/services/user.service';
import { KEYS } from '../../../core/constants';
import { HttpResponseError } from '../../../core/utils/http-response-error';

export class UserController implements Controller {
  initialize(httpServer: HttpServer): void {
    httpServer.post('/user', this.createUser.bind(this), ['admin', 'superadmin']);
  }

  private readonly createUser: RequestHandler = async (req, res, next) => {
    if (req?.body?.adminKey !== process.env[KEYS.ADMIN_KEY]) {
      throw new HttpResponseError(401, 'INVALID_ADMIN_KEY', 'Please, add a valid `adminKey` to body');
    }
    const userCreated = await userService.createUser(req?.body);
    res.send({ 'user': userCreated });
    next();
  }
}
