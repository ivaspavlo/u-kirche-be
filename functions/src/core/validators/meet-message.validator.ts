import { validateEmail, validateObject, validateString } from './generic.validator';
import { validateRecaptcha } from './recaptcha.validator';

export async function validateMeetMessageData(value: any): Promise<void> {
	validateObject(value);
	validateEmail(value.email);
	validateString(value.lang);
	validateString(value.name, 'name');
	validateString(value.phone, 'phone');

	if (value.message) {
		validateString(value.message, 'message');
	}

	debugger;
	await validateRecaptcha(value.recaptcha);
}
