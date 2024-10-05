import { RequestHandler } from 'express';
import { Controller, HttpServer } from '../index';
import { articlesService } from '../../../core/services/articles-service';
import { Article } from '../../../core/data/article';

export class ProductController implements Controller {

  initialize(httpServer: HttpServer,): void {
    httpServer.post('/article', this.createArticle.bind(this), ['manager', 'admin']);

    /** If claims are equal to ['user'], that means the same as 'authenticated' */
    /** But if claims are undefined or [], that means that also unauthenticated users can access */
    // httpServer.get ('/all-products-public', this.getProductListPublic.bind(this), ['user', 'manager', 'admin']);
    // httpServer.get ('/product/:productId', this.getProductByIdPublic.bind(this), ['authenticated']);
    // httpServer.get ('/product/:productId/full-details', this.getProductByIdFull.bind(this), ['admin']);
    // httpServer.put ('/product/:productId', this.updateProductById.bind(this), ['admin']);
  }

  private readonly createArticle: () => RequestHandler = async (req, res, next) => {
    const productFromInput: Article = ProductClientModel.validate(req.body, req.auth.uid);
    const product = await articlesService.createArticle(productFromInput);
    const output = ProductClientModel.fromEntity(product).toBodyFullProduct();
    res.send(output);
    next();
  }



}
