import { RequestHandler } from 'express';
import { Controller, HttpServer } from './';
import { articlesService } from '../../core/services/articles-service';
import { Article } from '../../core/data/models/article/article';
import { ArticleClientModel } from '../../core/data/models/article/client/article-client-model';
import { HttpResponseError } from '../../core/utils/http-response-error';
import { ROLE } from '../../core/constants';

export class ArticleController implements Controller {

  initialize(httpServer: HttpServer,): void {
    // If claims are equal to ['user'], that means the same as 'authenticated'
    httpServer.post('/article', this.createArticle.bind(this), [ROLE.ADMIN, ROLE.SUPERADMIN]);
    httpServer.get('/article/:articleId', this.getArticle.bind(this), []);
  }

  private readonly createArticle: RequestHandler = async (req, res, next) => {
    const articleFromInput: Article = ArticleClientModel.validate(req.body);
    const article = await articlesService.createArticle(articleFromInput);
    const output = ArticleClientModel.fromEntity(article).toBodyFullArticle();
    res.send(output);
    next();
  }

  private readonly getArticle: RequestHandler = async (req, res, next) => {
    const articleId = req.params['articleId'];
    if(!articleId?.length) {
      throw new HttpResponseError(400, 'BAD_REQUEST', 'Nor article id was provided');
    }
    const article = await articlesService.getArticleById(articleId);
    if (!article) {
      throw new HttpResponseError(404, `No article was found for id: ${articleId}`);
    }
    res.send(article);
    next();
  }
}
