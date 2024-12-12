import * as admin from 'firebase-admin';
import { COLLECTION } from '../constants';
import { IContent } from '../models/content/content.interface';
import { validateContentBody } from '../validators';

export class ContentService {
    private collection() {
        return admin.firestore().collection(COLLECTION.CONTENT);
    }

    // async createContent(body: any): Promise<IContent | null> {
    //     validateContentBody(body);

    //     this.collection().add(body);
    // }

    async getContent(): Promise<IContent | null> {
        const querySnapshot = await this.collection().get();
        const documents = querySnapshot.docs.map(d => d.data());

        // Content collection has only one document
        return documents[0] as IContent;
    }
}

export const contentService = new ContentService();
