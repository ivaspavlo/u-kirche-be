import * as admin from 'firebase-admin';
import { IUserBody, IUserClient, IUserFirebase } from '../data/models/user/user.interface';
import { COLLECTION } from '../constants';
import { UserModel } from '../data/models/user/user.model';

class UserService {
  async createUser(body: IUserBody): Promise<IUserClient> {
    const userInput: IUserFirebase = await UserModel.fromBody(body);
    const userRef = await admin.firestore()
      .collection(COLLECTION.USERS)
      .add(userInput);
    return UserModel.toBody(userRef);
  }
}

export const userService: UserService = new UserService();
