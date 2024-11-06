import { HttpResponseError } from '../../../../core/utils/http-response-error';
import { validateString } from '../../../../core/utils/validators';

export function validateLoginField(value: string): void {
  if (!validateString(value)) {
    throw new HttpResponseError(400, 'BAD_REQUEST', 'Field must be of string type');
  }
}
