import * as admin from 'firebase-admin';
import { DocumentReference } from 'firebase-admin/firestore';

import { IUserRegisterReqRaw, IUserRes, IUserRegisterReqFormatted, IUser } from '../interfaces';
import { COLLECTION, ENV_KEY, ROLE } from '../constants';
import { validateEmail, validateStringNotEmpty, validateUserPassword } from '../validators';
import { HttpResponseError } from '../utils';

const bcrypt = require('bcrypt');

class UserService {
    public async createUser(body: IUserRegisterReqRaw): Promise<IUserRes> {
        const userInput: IUserRegisterReqFormatted = await this.formatRegisterReqBody(body);
        const userRef = await admin.firestore().collection(COLLECTION.USERS).add(userInput);

        return this.#toBody(userRef);
    }

    public async getUserById(id: string): Promise<IUserRes> {
        const userRef = await admin.firestore().collection(COLLECTION.USERS).doc(id);
        return this.#toBody(userRef);
    }

    public async deleteUser(id: string): Promise<IUserRes> {
        const userRef = await admin.firestore().collection(COLLECTION.USERS).doc(id);
        const user = await this.#toBody(userRef);
        await userRef.delete();
        return user;
    }

    public async getUsers(): Promise<IUserRes[]> {
        const users = (await admin.firestore().collection(COLLECTION.USERS).get()).docs;
        return users.map((d => this.#getUserRes({
            id: d.id,
            createdAt: d.createTime.toMillis(),
            updatedAt: d.updateTime.toMillis(),
            ...d.data()
        } as IUser)));
    }

    public async formatRegisterReqBody(body: IUserRegisterReqRaw): Promise<IUserRegisterReqFormatted> {
        validateStringNotEmpty(body?.name);
        validateEmail(body?.email);
        validateUserPassword(body?.password);

        const existingUser = await admin
            .firestore()
            .collection(COLLECTION.USERS)
            .where('email', '==', body.email)
            .get();

        if (!existingUser.empty) {
            throw new HttpResponseError(400, 'Email already registered');
        }

        const hashedPassword = await bcrypt.hash(body.password, process.env[ENV_KEY.SALT_ROUNDS]);

        return {
            name: body.name,
            email: body.email,
            password: hashedPassword,
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
}

export const userService: UserService = new UserService();
