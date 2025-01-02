import { LANG } from '../constants';
import { HttpResponseError } from '../utils/http-response-error';

/** source: https://stackoverflow.com/a/9204568/4508758 */
export function validateEmail(email: string): void {
	const re = /\S+@\S+\.\S+/;
	if (!re.test(email)) {
		throw new HttpResponseError(400, 'BAD_REQUEST', 'Email is not correct');
	}
}

export function validateString(value: unknown, fieldName?: string): void {
	if (typeof value !== 'string') {
		throw new HttpResponseError(400, 'BAD_REQUEST', `Field must be of type string${formatFieldName(fieldName)}`);
	}
}

export function validateStringNotEmpty(value: unknown, fieldName?: string): void {
	if (typeof value !== 'string' || value.length === 0) {
		throw new HttpResponseError(400, 'BAD_REQUEST', `Field must be of type string and not empty${formatFieldName(fieldName)}`);
	}
}

export function validateObject(value: unknown, fieldName?: string): void {
	if (typeof value !== 'object') {
		throw new HttpResponseError(400, 'BAD_REQUEST', `Field must be of type object${formatFieldName(fieldName)}`);
	}
}

export function validateArray(value: unknown, fieldName?: string): void {
	if (!Array.isArray(value)) {
		throw new HttpResponseError(400, 'BAD_REQUEST', `Field must be of type array${formatFieldName(fieldName)}`);
	}
}

export function validateTextContent(value: any, fieldName?: string): void {
	validateObject(value);
	if (!value?.name) {
		throw new HttpResponseError(400, 'BAD_REQUEST', `Object must contain field 'name'${formatFieldName(fieldName)}`);
	}
	validateString(value.name.ua, 'name.ua');
	validateString(value.name.de, 'name.de');
}

export function validateNullable(value: unknown, fieldName?: string): void {
	if (!!value) {
		throw new HttpResponseError(400, 'BAD_REQUEST', `Instance is not nullable${formatFieldName(fieldName)}`);
	}
}

export function validateNotNullable(value: unknown, fieldName?: string): void {
	if (!value) {
		throw new HttpResponseError(400, 'BAD_REQUEST', `Instance is nullable${formatFieldName(fieldName)}`);
	}
}

export function validateLanguageField(value: unknown, fieldName?: string): void {
	if (typeof value !== 'string' || (value !== LANG.UA && value !== LANG.DE)) {
		throw new HttpResponseError(400, 'BAD_REQUEST', `Language field is not correct${formatFieldName(fieldName)}`);
	}
}

function formatFieldName(fieldName?: string): string {
	return `${fieldName ? ': ' + fieldName : ''}`;
}
