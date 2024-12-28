import { validateEmail, validateLanguageField, validateObject, validateString } from './generic.validator';

export function validateMeetMessageData(value: any): void {
	validateObject(value);
	validateEmail(value.email);
	validateString(value.lang);
	validateString(value.name, 'name');
	validateString(value.phoneNumber, 'phoneNumber');

	if (value.message) {
		validateString(value.message, 'message');
	}
}
