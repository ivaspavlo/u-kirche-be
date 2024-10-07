import * as admin from 'firebase-admin';
import { Article } from '../data/article';
import { COLLECTION } from '../constants';
import { ArticleFirestoreModel } from '../data/models/article/firestore/article-firestore-model';
import { FieldValue } from 'firebase-admin/firestore';

export class ArticlesService {

  private collection() {
    return admin.firestore().collection(COLLECTION.ARTICLES);
  }

  private doc(productId?:string) {
    if (!productId) return this.collection().doc();
    return this.collection().doc(productId);
  }

  async getArticleById(id: string): Promise<Article | null> {
    const res = await this.doc(id).get();
    if(!res.exists){
      return null;
    }
    return ArticleFirestoreModel.fromDocumentData(res.data());
  }

  async createArticle(article: Article): Promise<Article> {
    const articleRef = this.doc();
    const data = ArticleFirestoreModel.fromEntity(article).toDocumentData(articleRef.id, FieldValue.serverTimestamp());
    await articleRef.set(data);
    return ArticleFirestoreModel.fromDocumentData((await articleRef.get()).data());
  }
}

export const articlesService = new ArticlesService();
