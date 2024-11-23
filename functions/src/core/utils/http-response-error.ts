import { ERROR_CODE } from '../constants';

export class HttpResponseError extends Error {
    constructor(
        public readonly status: number,
        public readonly code: string = ERROR_CODE.UNKNOWN,
        public readonly description: string = `An error occurred with status '${status}' and code '${code}'`
    ) {
        super(`[HttpResponseError] status: '${status}' code: '${code}' description: '${description}'`);
    }
}

export class ErrorResponseBody {
    constructor(
        public error: {
            code: string,
            description: string
        }
    ) {}
}
