import { RequestHandler } from 'express';
import { HttpServer } from '../../core/utils';
import { Controller } from '../../core/interfaces';

export class ContentController implements Controller {
    initialize(httpServer: HttpServer): void {
        httpServer.get('/content', this.getContent.bind(this), []);
    }

    private readonly getContent: RequestHandler = async (_, res, next) => {
        // const article = await articlesService.getArticleById();
        // res.send(article);
        next();
    };
}
