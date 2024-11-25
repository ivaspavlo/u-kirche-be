import { RequestHandler } from 'express';
import { Controller, HttpServer } from './';
import { articlesService } from '../../core/services/articles-service';
import { HttpResponseError } from '../../core/utils/http-response-error';
import { ROLE } from '../../core/constants';
import { IArticleReq } from '../../core/models/article/article.interface';

export class ArticleController implements Controller {
    initialize(httpServer: HttpServer): void {
        httpServer.post('/article', this.createArticle.bind(this), [ROLE.ADMIN, ROLE.SUPERADMIN]);
        httpServer.get('/article/:id', this.getArticle.bind(this), []);
    }

    private readonly createArticle: RequestHandler = async (req, res, next) => {
        const articleFromInput: IArticleReq = articlesService.fromBody(req.body);
        const article = await articlesService.createArticle(articleFromInput);
        res.send(article);
        next();
    };

    private readonly getArticle: RequestHandler = async (req, res, next) => {
        const articleId = req.params['articleId'];
        if (!articleId?.length) {
            throw new HttpResponseError(400, 'BAD_REQUEST', 'Nor article id was provided');
        }
        const article = await articlesService.getArticleById(articleId);
        if (!article) {
            throw new HttpResponseError(404, `No article was found for id: ${articleId}`);
        }
        res.send(article);
        next();
    };
}
