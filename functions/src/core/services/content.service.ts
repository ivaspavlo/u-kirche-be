import * as admin from 'firebase-admin';
import { COLLECTION } from '../constants';
import { IContent } from '../interfaces';
import { validateContentBody, validateNullable, validateObject } from '../validators';

export class ContentService {
    private collection() {
        return admin.firestore().collection(COLLECTION.CONTENT);
    }

    async createContent(body: unknown): Promise<IContent | null> {
        const contentData = await this.getContent();
        validateNullable(contentData);
        validateContentBody(body);
        await this.collection().add(body);
        return await this.getContent();
    }

    async updateContent(body: unknown): Promise<IContent | null> {
        validateContentBody(body);
        const contentData = await this.getContent();
        validateObject(contentData);
        this.collection()
            .doc(contentData.id)
            .update({ ...contentData, ...(body as object) });
        return await this.getContent();
    }

    async getContent(): Promise<IContent | null> {
        const querySnapshot = await this.collection().get();
        const documents = querySnapshot.docs.map((d) => ({ id: d.id, ...d.data() }));

        // Content collection has only one document
        return (documents[0] as IContent) ?? null;
    }
}

export const contentService = new ContentService();
