import { validateArray, validateObject, validateString, validateEmail, validateTextContent } from './generic.validator';

export function validateContentBody(value: any): void {
    validateObject(value);

    if (value?.email) {
        validateEmail(value?.email);
    }

    if (value?.iban) {
        validateString(value.iban);
    }

    if (value?.phoneContacts) {
        validateArray(value.phoneContacts);

        value.phoneContacts.forEach(i => validateTextContent(i));
    }

    if (value?.socialLinks) {
        validateArray(value.socialLinks);

        value.socialLinks.forEach(i => {
            validateString(i.link);
            validateString(i.title);
        });
    }

    if (value?.headerBanner) {
        validateString(value.headerBanner.message);
        validateString(value.headerBanner.link);
    }

    if (value?.footerBanner) {
        validateString(value.footerBanner.message);
        validateString(value.footerBanner.link);
    }
}
