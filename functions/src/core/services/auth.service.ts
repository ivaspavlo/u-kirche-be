import * as admin from 'firebase-admin';
import * as jwt from 'jsonwebtoken';
import { QueryDocumentSnapshot } from 'firebase-admin/firestore';
import { defineString } from 'firebase-functions/params';
import { Request } from 'express';
import { validateString, validateEmail } from '../validators';
import { ILoginReq, ILoginRes, IParsedJwt, IUser } from '../interfaces';
import { COLLECTION, KEYS } from '../constants';
import { HttpResponseError } from '../utils';

const bcrypt = require('bcrypt');
const jwtExp = defineString(KEYS.JWT_EXPIRE);

class AuthService {
    public async login(body: any): Promise<any> {
        const input: ILoginReq = await this.#fromBody(body);
        const user = await this.#getUser(input);

        await this.#checkPassword(body, user.password);

        const jwt = this.#generateJwt({ id: user.id }, process.env[KEYS.JWT_SECRET] as string, {
            expiresIn: jwtExp.value()
        });

        return this.#toBody(jwt);
    }

    public extractJwt(req: Request): string {
        const authData: string | undefined = String(req?.headers?.authorization);
        const jwt: string = authData?.includes('Bearer ') ? authData.split(' ')[1] : '';
        return jwt;
    }

    public verifyJwt(value: string): boolean {
        try {
            jwt.verify(value, process.env[KEYS.JWT_SECRET]);
            return true;
        } catch (e: any) {
            return false;
        }
    }

    public parseJwt(value): IParsedJwt | null {
        try {
            return JSON.parse(Buffer.from(value!.split('.')[1], 'base64').toString());
        } catch (error) {
            return null;
        }
    }

    async #getUser(input: ILoginReq): Promise<IUser> {
        const queryByEmail = await admin
            .firestore()
            .collection(COLLECTION.USERS)
            .where('email', '==', input.email)
            .get();

        if (queryByEmail.empty) {
            throw new HttpResponseError(401, 'Incorrect credentials');
        }

        const userDocumentSnapshot: QueryDocumentSnapshot | undefined = queryByEmail.docs.find((d) => !!d);
        const user = userDocumentSnapshot.data() as IUser;

        return {
            id: userDocumentSnapshot.id,
            createdAt: userDocumentSnapshot.createTime,
            updatedAt: userDocumentSnapshot.updateTime,
            ...user
        };
    }

    #generateJwt(data: object, secret: string, options: object = {}): string | null {
        return jwt.sign(data, secret, options);
    }

    async #checkPassword(input: ILoginReq, password: string): Promise<void> {
        const isPasswordCorrect = await bcrypt.compare(input.password, password);

        if (!isPasswordCorrect) {
            throw new HttpResponseError(401, 'Incorrect credentials');
        }
    }

    async #fromBody(body: any): Promise<ILoginReq> {
        validateEmail(body?.email);
        validateString(body?.password);
        // no need to map
        return body as ILoginReq;
    }

    #toBody(jwt: string): ILoginRes {
        return { jwt };
    }
}

export const authService: AuthService = new AuthService();
