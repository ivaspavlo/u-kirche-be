import { RequestHandler } from 'express';
import { Controller } from '../../core/interfaces';
import { HttpServer } from '../../core/utils';
import { ENV_KEY } from '../../core/constants';

let counter: number = 1;

export class RootController implements Controller {
    initialize(httpServer: HttpServer): void {
        httpServer.get('/', this.root.bind(this));
    }

    private readonly root: RequestHandler = async (_, res, next) => {
        res.send({
            status: `API is working in mode: ${process.env[ENV_KEY.MODE]}. Request counter: ${counter++}. UI: ${process.env[ENV_KEY.UI_ORIGIN]}`
        });
        next();
    };
}
