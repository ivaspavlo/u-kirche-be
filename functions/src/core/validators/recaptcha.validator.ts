import { validateStringNotEmpty } from './generic.validator';
import { ENV_KEY, ERROR_CODE } from '../constants';
import { HttpResponseError } from '../utils';

interface RecaptchaVerificationResponse {
    success?: boolean;
    score?: number;
}

export async function validateRecaptcha(value: any): Promise<void> {
    try {
        validateStringNotEmpty(value, 'recaptcha');
    } catch (error: unknown) {
        return Promise.reject(error);
    }

    const secret = process.env[ENV_KEY.RECAPTCHA_SECRET];

    if (!secret) {
        throw new HttpResponseError(503, ERROR_CODE.INTERNAL_ERROR, 'Recaptcha service is not configured');
    }

    const responseError = new HttpResponseError(400, ERROR_CODE.BAD_REQUEST, 'Validation failed for recaptcha');

    try {
        const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({ secret, response: value })
        });

        if (!response.ok) {
            throw responseError;
        }

        const data = (await response.json()) as RecaptchaVerificationResponse;

        if (data.success !== true || typeof data.score !== 'number' || data.score < 0.5) {
            throw responseError;
        }
    } catch (error: unknown) {
        throw responseError;
    }
}
