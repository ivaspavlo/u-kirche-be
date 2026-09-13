import { IUserRes, TClaim } from '../../interfaces';

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
            claims: Partial<Record<TClaim, boolean>>;

            /**
             * Contains user data associated with the verified Firebase identity.
             */
            user?: IUserRes;
        }
    }
}
