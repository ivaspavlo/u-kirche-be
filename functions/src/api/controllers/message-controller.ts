import { RequestHandler } from 'express';
import { Controller } from '../../core/interfaces';
import { HttpServer } from '../../core/utils';
import { messageService } from '../../core/services';

export class MessageController implements Controller {
    initialize(httpServer: HttpServer): void {
        httpServer.post('/meet', this.meet.bind(this), []);
    }

    private readonly meet: RequestHandler = async (req, res, next) => {
        const result = await messageService.meet(req.body);
        res.send(result);
        next();
    };
}
