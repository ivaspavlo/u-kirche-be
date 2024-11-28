import { RequestHandler } from 'express';
import { articlesService } from '../../core/services';
import { HttpResponseError, HttpServer } from '../../core/utils';
import { ERROR_CODE, ROLE } from '../../core/constants';
import { Controller } from '../../core/interfaces';
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
            throw new HttpResponseError(400, ERROR_CODE.BAD_REQUEST, 'Nor article id was provided');
        }
        const article = await articlesService.getArticleById(articleId);
        if (!article) {
            throw new HttpResponseError(404, ERROR_CODE.NOT_FOUND, `No article was found for id: ${articleId}`);
        }
        res.send(article);
        next();
    };
}
