import { validateStringNotEmpty } from './generic.validator';
import { ENV_KEY } from '../constants';
import { HttpResponseError } from '../utils';

export async function validateRecaptcha(value: any): Promise<void> {
    try {
        validateStringNotEmpty(value, 'recaptcha');
    } catch (error: unknown) {
        return Promise.reject(error);
    }

    const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env[ENV_KEY.RECAPTCHA_SECRET]}&response=${value}`;
    const responseError = new HttpResponseError(400, 'BAD_REQUEST', `Validation failed for recaptcha`);

    try {
        const response = await fetch(verificationUrl, { method: 'POST' });
        const data = await response.json();

        if (!data.success && data.score < 0.5) {
            throw responseError;
        }
    } catch (error: unknown) {
        throw responseError;
    }
}
