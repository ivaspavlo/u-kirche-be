import { RequestHandler } from 'express';
import { Controller, HttpServer } from '../index';
import { accountsService } from '../../../core/services/accounts-service';
import { UserClientModel } from '../../../core/data/models/user/client/user-client-model';
import { HttpResponseError } from '../../../core/utils/http-response-error';
import { ENV_KEY, ENV_MODE, KEYS } from '../../../core/constants';

const { defineString } = require('firebase-functions/params');
const env = defineString(ENV_KEY.MODE);

export class AccountController implements Controller {

    initialize(httpServer: HttpServer): void {
        httpServer.post ('/account', this.createAccount.bind(this));
    }

    private readonly createAccount: RequestHandler = async (req, res, next,) => {
        const input: UserClientModel & { password: string, adminKey?: string } = UserClientModel.fromBody(req.body);

        // TODO: to be removed after development is complete
        if (
            env.value() === ENV_MODE.LOCAL ||
            (input.role === 'admin' && input.adminKey === process.env[KEYS.ADMIN_KEY])
        ) {
            throw new HttpResponseError(401, 'INVALID_ADMIN_KEY', 'Please, add a valid `adminKey` to body');
        }
        const refreshedUser = await accountsService.createAccount(input, input.password);

        res.send({
            'user': UserClientModel.fromEntity(refreshedUser).toBody(),
        });
        next();
    }
}

