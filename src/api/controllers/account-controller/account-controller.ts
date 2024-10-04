import { RequestHandler } from 'express';
import { Controller, HttpServer } from '../index';
import { accountsService } from '../../../core/services/accounts-service';
import { UserClientModel } from '../../../core/data/models/user/client/user-client-model';
import { HttpResponseError } from '../../../core/utils/http-response-error';
import { KEYS } from '../../../core/constants';

export class AccountController implements Controller {

    initialize(httpServer: HttpServer): void {
        httpServer.post ('/account', this.createAccount.bind(this));
    }

    private readonly createAccount: RequestHandler = async (req, res, next,) => {
        const input: UserClientModel & { password: string, adminKey?: string } = UserClientModel.fromBody(req.body);

        // TODO: need to test in action
        if (input.role == 'admin' && input.adminKey === process.env[KEYS.ADMIN_KEY]) {
            throw new HttpResponseError(401, 'INVALID_ADMIN_KEY', 'Please, pass a valid `adminKey` on body');
        }
        const refreshedUser = await accountsService.createAccount(input, input.password);

        res.send({
            'user': UserClientModel.fromEntity(refreshedUser).toBody(),
        });
        next();
    }
}

