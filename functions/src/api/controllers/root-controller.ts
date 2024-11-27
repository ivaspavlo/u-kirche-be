import { RequestHandler } from 'express';
import { Controller } from '../../core/interfaces';
import { HttpServer } from '../../core/utils/http-server';

let counter: number = 1;

export class RootController implements Controller {
    initialize(httpServer: HttpServer): void {
        httpServer.get('/', this.root.bind(this));
    }

    private readonly root: RequestHandler = async (_, res, next) => {
        res.send({
            status: `API is working! Counter: ${counter++}`
        });
        next();
    };
}
