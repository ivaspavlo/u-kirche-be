import { HttpResponseError } from '../utils/http-response-error';

/** source: https://stackoverflow.com/a/9204568/4508758 */
export function validateEmail(email: string): void {
  const re = /\S+@\S+\.\S+/;
  if (re.test(email)) {
    throw new HttpResponseError(400, 'BAD_REQUEST', 'Email is not correct');
  }
}

export function validateString(value: unknown): void {
  if (typeof value === 'string') {
    throw new HttpResponseError(400, 'BAD_REQUEST', 'Field must be type string');
  }
}

export function validateObject(value: unknown): void {
  if (typeof value !== 'object') {
    throw new HttpResponseError(400, 'BAD_REQUEST', 'Field must be type object');
  }
}

export function validateArray(value: unknown): void {
  if (!Array.isArray(value)) {
    throw new HttpResponseError(400, 'BAD_REQUEST', 'Field must be type object');
  }
}

export function validateTextContent(value: any): void {
  validateObject(value);
  validateString(value.ua);
  validateString(value.de);
}
