import { RequestHandler } from 'express';
import { Controller } from '../../core/interfaces';
import { HttpServer } from '../../core/utils';
import { ENV_KEY, ENV_MODE } from '../../core/constants';

let counter: number = 1;

export class RootController implements Controller {
    initialize(httpServer: HttpServer): void {
        httpServer.get('/', this.root.bind(this));
    }

    private readonly root: RequestHandler = async (_, res, next) => {
        const mode = process.env[ENV_KEY.MODE] ?? ENV_MODE.LOCAL;
        const uiOrigin = process.env[ENV_KEY.UI_ORIGIN] ?? 'http://localhost:4200';

        res.send({
            status: `API is working in mode: ${mode}. Request counter: ${counter++}. UI: ${uiOrigin}`
        });
        next();
    };
}
