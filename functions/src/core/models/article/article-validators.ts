import { HttpResponseError } from '../../utils/http-response-error';

export function validateStingNotEmpty(value: string): void {
  if (!value?.length) {
    throw new HttpResponseError(400, 'BAD_REQUEST', 'No `title` defined');
  }
}
