import { RequestHandler } from 'express';
import { HttpServer } from '../../core/utils';
import { Controller } from '../../core/interfaces';
import { contentService } from 'src/core/services/content.service';

export class ContentController implements Controller {
    initialize(httpServer: HttpServer): void {
        httpServer.get('/content', this.getContent.bind(this), []);
    }

    private readonly getContent: RequestHandler = async (_, res, next) => {
        const content = await contentService.getContent();
        res.send(content);
        next();
    };
}
