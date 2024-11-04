import { DocumentData, FieldValue, Timestamp } from 'firebase-admin/firestore';
import { Article } from '../article';

export class ArticleFirestoreModel extends Article {
  static kTitle = 'title';
  static kContent = 'content';
  static kAuthorId = 'authorId';
  static kArticleId = 'articleId';
  static kCreatedAt = 'createdAt';

  static fromEntity(article?: Article): ArticleFirestoreModel | null {
    if (article == null) {
      return null
    };
    return Object.assign(ArticleFirestoreModel.empty(), article);
  }

  static empty() {
    return new ArticleFirestoreModel('','','','',new Date());
  }

  public toDocumentData(articleId?: string, createdAt?: Timestamp| FieldValue) {
    return {
      [ArticleFirestoreModel.kArticleId]: articleId ?? this.articleId,
      [ArticleFirestoreModel.kCreatedAt]: createdAt ?? this.createdAt,
      [ArticleFirestoreModel.kTitle]: this.title,
      [ArticleFirestoreModel.kContent]: this.content,
      [ArticleFirestoreModel.kAuthorId]: this.authorId
    }
  }

  static fromDocumentData(data: DocumentData) {
    return new ArticleFirestoreModel(
      data[ArticleFirestoreModel.kArticleId],
      data[ArticleFirestoreModel.kTitle],
      data[ArticleFirestoreModel.kContent],
      data[ArticleFirestoreModel.kAuthorId],
      (data[ArticleFirestoreModel.kCreatedAt] as Timestamp).toDate(),
    );
  }
}
