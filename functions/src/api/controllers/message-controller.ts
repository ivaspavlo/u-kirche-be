import { RequestHandler } from 'express';
import { Controller } from '../../core/interfaces';
import { HttpServer } from '../../core/utils';

export class MessageController implements Controller {
    initialize(httpServer: HttpServer): void {
        httpServer.post('/meet', this.meet.bind(this), []);
    }

    private readonly meet: RequestHandler = async (_, res, next) => {
        res.send({});
        next();
    };
}
