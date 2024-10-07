import { Article } from '../../../article';

export class ArticleClientModel extends Article {
  static kArticleId = 'articleId';
  static kTitle = 'title';
  static kContent = 'content';
  static kCreatedAtMillisecondsSinceEpoch = 'createdAtMillisecondsSinceEpoch';

  static fromEntity (article: Article): ArticleClientModel {
    return Object.assign(ArticleClientModel.empty(), article);
  }

  static empty() {
    return new ArticleClientModel('','','',new Date());
  }

  private static _validate(body: any) {
    // validateProductName(body[ProductClientModel.kName]);
    // validateProductPrice(body[ProductClientModel.kPrice]);
    // validateStockQuantity(body[ProductClientModel.kStockQuantity]);
    // validateInternalCode(body[ProductClientModel.kInternalCode]);
  }

  static validate(body: any, storeOwnerUid: string): ArticleClientModel {
    this._validate(body);
    return new ArticleClientModel(
      null,
      body[ArticleClientModel.kTitle],
      body[ArticleClientModel.kContent],
      null
    );
  }

  public toBodyFullArticle() {
    return {
      ...this.toBodyPublicArticle(),
      [ArticleClientModel.kCreatedAtMillisecondsSinceEpoch]: this.createdAt.getTime()
    }
  }

  public toBodyPublicArticle() {
    return {
      [ArticleClientModel.kArticleId]: this.articleId,
      [ArticleClientModel.kTitle]: this.title,
      [ArticleClientModel.kContent]: this.content
    }
  }
}
