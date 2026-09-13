import { DocumentReference, FieldValue, getFirestore } from 'firebase-admin/firestore';

import { IUserRegisterReqRaw, IUserRes, IUserRegisterReqFormatted, IUser } from '../interfaces';
import { COLLECTION, ERROR_CODE, ROLE } from '../constants';
import { validateEmail, validateStringNotEmpty } from '../validators';
import { HttpResponseError } from '../utils';

class UserService {
    public async createUser(body: IUserRegisterReqRaw): Promise<IUserRes> {
        const userInput: IUserRegisterReqFormatted = await this.formatRegisterReqBody(body);
        const userRef = await getFirestore().collection(COLLECTION.USERS).add(userInput);

        return this.#toBody(userRef);
    }

    public async getUserById(id: string): Promise<IUserRes> {
        const userRef = await getFirestore().collection(COLLECTION.USERS).doc(id);
        return this.#toBody(userRef);
    }

    public async getUserByFirebaseIdentity(firebaseUid: string, email: string): Promise<IUserRes> {
        const users = getFirestore().collection(COLLECTION.USERS);
        const userByUid = await users.where('firebaseUid', '==', firebaseUid).limit(1).get();

        if (!userByUid.empty) {
            const userDocument = userByUid.docs[0];
            await this.#deleteLegacyPassword(userDocument.ref, userDocument.get('password'));
            return this.#toBody(userDocument.ref);
        }

        const normalizedEmail = email.trim().toLowerCase();
        const userByEmail = await users.where('email', '==', normalizedEmail).limit(1).get();

        if (userByEmail.empty) {
            throw new HttpResponseError(403, ERROR_CODE.FORBIDDEN, 'User is not authorized');
        }

        const userDocument = userByEmail.docs[0];
        const existingFirebaseUid = userDocument.get('firebaseUid');

        if (existingFirebaseUid && existingFirebaseUid !== firebaseUid) {
            throw new HttpResponseError(403, ERROR_CODE.FORBIDDEN, 'User is not authorized');
        }

        await userDocument.ref.update({
            firebaseUid,
            ...(userDocument.get('password') ? { password: FieldValue.delete() } : {})
        });

        return this.#toBody(userDocument.ref);
    }

    public async deleteUser(id: string): Promise<IUserRes> {
        const userRef = await getFirestore().collection(COLLECTION.USERS).doc(id);
        const user = await this.#toBody(userRef);
        await userRef.delete();
        return user;
    }

    public async getUsers(): Promise<IUserRes[]> {
        const users = (await getFirestore().collection(COLLECTION.USERS).get()).docs;
        return users.map((d) =>
            this.#getUserRes({
                id: d.id,
                createdAt: d.createTime.toMillis(),
                updatedAt: d.updateTime.toMillis(),
                ...d.data()
            } as IUser)
        );
    }

    public async formatRegisterReqBody(body: IUserRegisterReqRaw): Promise<IUserRegisterReqFormatted> {
        validateStringNotEmpty(body?.name);
        validateEmail(body?.email);

        const email = body.email.trim().toLowerCase();

        const existingUser = await getFirestore().collection(COLLECTION.USERS).where('email', '==', email).get();

        if (!existingUser.empty) {
            throw new HttpResponseError(400, 'Email already registered');
        }

        return {
            name: body.name.trim(),
            email,
            role: ROLE.ADMIN
        };
    }

    async #toBody(docRef: DocumentReference): Promise<IUserRes> {
        const userDocument = await docRef.get();
        const user = userDocument.data();
        return this.#getUserRes({
            id: userDocument.id,
            createdAt: userDocument.createTime.toMillis(),
            updatedAt: userDocument.updateTime.toMillis(),
            ...user
        } as IUser);
    }

    #getUserRes(user: IUser): IUserRes {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            updatedAt: user.updatedAt,
            createdAt: user.createdAt
        };
    }

    async #deleteLegacyPassword(userRef: DocumentReference, password: unknown): Promise<void> {
        if (password) {
            await userRef.update({ password: FieldValue.delete() });
        }
    }
}

export const userService: UserService = new UserService();
