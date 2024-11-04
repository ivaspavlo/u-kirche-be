import * as admin from 'firebase-admin';
import { defineInt } from 'firebase-functions/params';
import { DocumentReference } from 'firebase-admin/firestore';
import { HttpResponseError } from '../../../../core/utils/http-response-error';
import { ENV_KEY, ROLE } from '../../../constants';
import { COLLECTION } from '../../../constants';
import { IUserBody, IUserClient, IUserFirebase } from './user.interface';
import { validateUserEmail, validateUserName, validateUserPassword } from './user.validators';

const bcrypt = require('bcrypt');
const saltRounds = defineInt(ENV_KEY.SALT_ROUNDS);

export class UserModel {
    static async fromBody(body: IUserBody): Promise<IUserFirebase> {
        validateUserName(body?.name);
        validateUserEmail(body?.email);
        validateUserPassword(body?.password);

        const existingUser = await admin.firestore()
            .collection(COLLECTION.USERS)
            .where('email', '==', body.email).get();
        if (!existingUser.empty) {
            throw new HttpResponseError(400, 'Email already registered');
        }

        const hashedPassword = await bcrypt.hash(
            body.password,
            saltRounds.value()
        );
        return {
            name: body.name,
            email: body.email,
            password: hashedPassword,
            role: ROLE.ADMIN
        }
    }

    static async toBody(docRef: DocumentReference): Promise<IUserClient> {
        const user = (await docRef.get()).data();
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            lastUpdated: user.lastUpdated,
            created: user.created
        }
    }
}
