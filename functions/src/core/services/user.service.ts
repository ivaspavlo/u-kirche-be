import * as admin from 'firebase-admin';
import { DocumentReference } from 'firebase-admin/firestore';
import { defineInt } from 'firebase-functions/params';
import { IUserReq, IUserRes, IUserRegister, IUser } from '../models/user/user.interface';
import { COLLECTION, KEYS, ROLE } from '../constants';
import { validateUserEmail, validateUserName, validateUserPassword } from '../models/user/user.validators';
import { HttpResponseError } from '../utils/http-response-error';

const bcrypt = require('bcrypt');
const saltRounds = defineInt(KEYS.SALT_ROUNDS);

class UserService {
    public async createUser(body: IUserReq): Promise<IUserRes> {
        const userInput: IUserRegister = await this.fromBody(body);
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

    public async fromBody(body: IUserReq): Promise<IUserRegister> {
        validateUserName(body?.name);
        validateUserEmail(body?.email);
        validateUserPassword(body?.password);

        const existingUser = await admin
            .firestore()
            .collection(COLLECTION.USERS)
            .where('email', '==', body.email)
            .get();

        if (!existingUser.empty) {
            throw new HttpResponseError(400, 'Email already registered');
        }

        const hashedPassword = await bcrypt.hash(body.password, saltRounds.value());

        return {
            name: body.name,
            email: body.email,
            password: hashedPassword,
            role: ROLE.ADMIN
        };
    }

    async #toBody(docRef: DocumentReference): Promise<IUserRes> {
        const user = (await docRef.get()).data() as IUser;
        return this.#getUserRes(user);
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
