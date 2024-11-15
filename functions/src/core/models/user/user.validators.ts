import { HttpResponseError } from '../../utils/http-response-error';
import { validateEmail } from '../../utils/validators';

export function validateUserName(name: string): void {
    if (!name?.length) {
        throw new HttpResponseError(400, 'BAD_REQUEST', 'Invalid `name`');
    }
}

export function validateUserEmail(email: string): void {
    if (!validateEmail(email)) {
        throw new HttpResponseError(400, 'BAD_REQUEST', 'Invalid `email`');
    }
}

export function validateUserPassword(password: string): void {
    if (!password?.length || password.length < 6) {
        throw new HttpResponseError(400, 'BAD_REQUEST', 'Invalid `password`');
    }
}
