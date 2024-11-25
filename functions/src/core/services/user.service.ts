import * as admin from 'firebase-admin';
import { DocumentReference } from 'firebase-admin/firestore';
import { defineInt } from 'firebase-functions/params';
import { IUserReq, IUserRes, IUserRegister } from '../models/user/user.interface';
import { COLLECTION, KEYS, ROLE } from '../constants';
import { validateUserEmail, validateUserName, validateUserPassword } from '../models/user/user.validators';
import { HttpResponseError } from '../utils/http-response-error';

const bcrypt = require('bcrypt');
const saltRounds = defineInt(KEYS.SALT_ROUNDS);

class UserService {
    public async createUser(body: IUserReq): Promise<IUserRes> {
        const userInput: IUserRegister = await this.fromBody(body);

        const userRef = await admin.firestore().collection(COLLECTION.USERS).add(userInput);

        return this.toBody(userRef);
    }

    public async getUserById(id: string): Promise<IUserRes> {
        const user = await admin.firestore().collection(COLLECTION.USERS).doc(id);

        return this.toBody(user);
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

    public async toBody(docRef: DocumentReference): Promise<IUserRes> {
        const user = (await docRef.get()).data();

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            updatedAt: user.lastUpdated,
            createdAt: user.created
        };
    }
}

export const userService: UserService = new UserService();
