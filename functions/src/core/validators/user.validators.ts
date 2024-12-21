import { HttpResponseError } from '../utils/http-response-error';

export function validateUserPassword(password: string): void {
    if (!password?.length || password.length < 6) {
        throw new HttpResponseError(400, 'BAD_REQUEST', 'Invalid `password`');
    }
}
