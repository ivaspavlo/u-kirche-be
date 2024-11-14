import * as admin from 'firebase-admin';
import * as jwt from 'jsonwebtoken';
import { QueryDocumentSnapshot } from 'firebase-admin/firestore';
import { defineString } from 'firebase-functions/params';
import { IUserFirestore } from '../data/models/user/user.interface';
import { COLLECTION, KEYS } from '../constants';
import { ILoginReq, ILoginRes } from '../data/models/auth/auth.interface';
import { HttpResponseError } from '../utils/http-response-error';
import { validateLoginField } from '../data/models/auth/auth.validators';

const bcrypt = require('bcrypt');
const jwtExp = defineString(KEYS.JWT_EXPIRE);

class AuthService {
  public async login(body: any): Promise<any> {
    const input: ILoginReq = await this.fromBody(body);
    const user = await this.getUser(input);

    await this.checkPassword(body, user);

    const jwt = this.generateJwt(
      { email: user.email },
      process.env[KEYS.JWT_SECRET] as string,
      { expiresIn: jwtExp.value() }
    );

    return this.toBody(user, jwt);
  }

  private async getUser(input: ILoginReq): Promise<IUserFirestore> {
    const queryByEmail = await admin.firestore()
      .collection(COLLECTION.USERS)
      .where('email', '==', input.email)
      .get();

    if (queryByEmail.empty) {
      throw new HttpResponseError(401, 'Incorrect credentials');
    }

    const userDocumentSnapshot: QueryDocumentSnapshot | undefined = queryByEmail.docs.find(d => !!d);
    const user = userDocumentSnapshot.data() as IUserFirestore;

    return user;
  }

  private generateJwt(data: object, secret: string, options: object = {}): string | null {
    return jwt.sign(data, secret, options);
  }

  private async checkPassword(input: ILoginReq, user: IUserFirestore): Promise<any> {
    const isPasswordCorrect = await bcrypt.compare(input.password, user.password);

    if (!isPasswordCorrect) {
      throw new HttpResponseError(401, 'Incorrect credentials');
    }
  }

  private async fromBody(body: any): Promise<ILoginReq> {
    validateLoginField(body?.email);
    validateLoginField(body?.password);
    // no need to map
    return body as ILoginReq;
  }

  private toBody(user: IUserFirestore, jwt: string): ILoginRes {
    return {
      jwt
    }
  }
}

export const authService: AuthService = new AuthService();
