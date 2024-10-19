import { Article } from '../../../article';
import { validateStingNotEmpty } from './article-validators';

export class ArticleClientModel extends Article {
  static kArticleId = 'articleId';
  static kTitle = 'title';
  static kContent = 'content';
  static kAuthorId = 'authorId';
  static kCreatedAtMillisecondsSinceEpoch = 'createdAtMillisecondsSinceEpoch';

  static fromEntity (article: Article): ArticleClientModel {
    return Object.assign(ArticleClientModel.empty(), article);
  }

  static empty() {
    return new ArticleClientModel('','','','', new Date());
  }

  private static _validate(body: unknown) {
    console.log(body);
    validateStingNotEmpty(body[ArticleClientModel.kTitle]);
    validateStingNotEmpty(body[ArticleClientModel.kContent]);
    validateStingNotEmpty(body[ArticleClientModel.kAuthorId]);
  }

  static validate(body: unknown): ArticleClientModel {
    this._validate(body);
    return new ArticleClientModel(
      null,
      body[ArticleClientModel.kTitle],
      body[ArticleClientModel.kContent],
      body[ArticleClientModel.kAuthorId],
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
      [ArticleClientModel.kContent]: this.content,
      [ArticleClientModel.kAuthorId]: this.authorId
    }
  }
}
