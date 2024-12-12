import { validateObject } from './generic.validator';

export function validateContentBody(value: any): void {
    validateObject(value);
}
