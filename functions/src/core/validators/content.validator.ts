import { validateArray, validateObject, validateString, validateEmail, validateTextContent } from './generic.validator';

export function validateContentBody(value: any): void {
    validateObject(value);

    if (value?.email) {
        validateEmail(value?.email);
    }

    if (value?.iban) {
        validateString(value.iban, 'iban');
    }

    if (value?.phoneContacts) {
        validateArray(value.phoneContacts, 'phoneContacts');

        value.phoneContacts.forEach((i) => validateTextContent(i, 'phoneContacts'));
    }

    if (value?.socialLinks) {
        validateArray(value.socialLinks, 'socialLinks');

        value.socialLinks.forEach((i) => {
            validateString(i.link, 'link');
            validateString(i.title, 'title');
        });
    }

    if (value?.headerBanner) {
        validateString(value.headerBanner.message, 'message');
        validateString(value.headerBanner.link, 'link');
    }

    if (value?.footerBanner) {
        validateString(value.footerBanner.message, 'message');
        validateString(value.footerBanner.link, 'link');
    }
}
