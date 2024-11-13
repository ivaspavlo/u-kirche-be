import * as admin from 'firebase-admin';
import { DocumentReference } from 'firebase-admin/firestore';
import { COLLECTION } from '../constants';
import { IArticleFirestore, IArticleReq, IArticleRes } from '../data/models/article/article.interface';

export class ArticlesService {
  private collection() {
    return admin.firestore().collection(COLLECTION.ARTICLES);
  }

  private doc(productId?:string) {
    if (!productId) {
      return this.collection().doc()
    };
    return this.collection().doc(productId);
  }

  async getArticleById(id: string): Promise<IArticleRes | null> {
    const res = await this.doc(id).get();
    if (!res.exists) {
      return null;
    }
    return await this.#toBody(await this.doc(id));
  }

  async createArticle(body: unknown): Promise<IArticleRes> {
    const articleReq: IArticleReq = this.#fromBody(body);
    const articleRef = await this.collection().add(articleReq);
    return await this.#toBody(articleRef);
  }

  #fromBody(body: unknown): IArticleReq {
    return;
  }

  async #toBody(articleRef: DocumentReference): Promise<IArticleRes> {
    const article = (await articleRef.get()).data() as IArticleFirestore;
    return {
      ...article,
      createdAt: (await articleRef.get()).createTime,
      id: articleRef.id
    }
  }
}

export const articlesService = new ArticlesService();
