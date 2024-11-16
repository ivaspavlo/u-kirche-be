import { DecodedIdToken, UserRecord } from 'firebase-admin/lib/auth';
import { TClaim } from '../../index';

export type Claims = {
    [claim in TClaim]: boolean;
};

declare global {
    namespace Express {
        interface Request {
            /**
             * Indicates whether the user is authenticated.
             */
            authenticated: boolean;

            /**
             * Indicates verified user claims.
             */
            claims?: Claims
        }
    }
}
