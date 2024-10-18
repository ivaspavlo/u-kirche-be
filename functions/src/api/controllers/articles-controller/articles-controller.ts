import { RequestHandler } from 'express';
import { Controller, HttpServer } from '../index';
import { articlesService } from '../../../core/services/articles-service';
import { Article } from '../../../core/data/article';
import { ArticleClientModel } from '../../../core/data/models/article/client/article-client-model';
import { HttpResponseError } from '../../../core/utils/http-response-error';

export class ArticleController implements Controller {

  initialize(httpServer: HttpServer,): void {
    httpServer.post('/article', this.createArticle.bind(this), ['manager', 'admin']);
    httpServer.get('/article/:articleId', this.getArticle.bind(this), []);

    /** If claims are equal to ['user'], that means the same as 'authenticated' */
    /** But if claims are undefined or [], that means that also unauthenticated users can access */
    // httpServer.get ('/all-products-public', this.getProductListPublic.bind(this), ['user', 'manager', 'admin']);
    // httpServer.get ('/product/:productId', this.getProductByIdPublic.bind(this), ['authenticated']);
    // httpServer.get ('/product/:productId/full-details', this.getProductByIdFull.bind(this), ['admin']);
    // httpServer.put ('/product/:productId', this.updateProductById.bind(this), ['admin']);
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
