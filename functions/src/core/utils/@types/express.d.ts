import { DecodedIdToken, UserRecord } from 'firebase-admin/lib/auth';
import { TClaim } from '../../../index';

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
            claims?: TClaim;

            /**
             * Contains user data derived from the JWT.
             */
            user?: IUserRes;
        }
    }
}
