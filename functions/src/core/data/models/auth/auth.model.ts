import { ILoginReq } from './auth.interface';
import { validateLoginField } from './auth.validators';

export class AuthModel {
  static async fromBody(body: ILoginReq): Promise<any> {
    validateLoginField(body?.email);
    validateLoginField(body?.password);

    
  }

  static async toBody(): Promise<any> {}
}
