import { firestore } from 'firebase-admin';
import * as admin from 'firebase-admin';

export class ArticlesService {
  private collection () {
    return admin.firestore().collection('products');
  }
  private doc (productId?:string) {
    if (!productId) return this.collection().doc();
    return this.collection().doc(productId);
  }

  
}

export const articlesService = new ArticlesService();
