export enum ENV_KEY {
    MODE = 'MODE',
    UI_ORIGIN = 'UI_ORIGIN',
    SEND_GRID_SECRET = 'SEND_GRID_SECRET',
    RECAPTCHA_SECRET = 'RECAPTCHA_SECRET'
}

export enum COLLECTION {
    USERS = 'users',
    ARTICLES = 'articles',
    CONTENT = 'content'
}

export enum ENV_MODE {
    LOCAL = 'LOCAL',
    PROD = 'PROD'
}

export enum ROLE {
    ADMIN = 'admin',
    SUPERADMIN = 'superadmin'
}

export enum ERROR_CODE {
    UNAUTHORIZED = 'UNAUTHORIZED',
    INTERNAL_ERROR = 'INTERNAL_ERROR',
    FORBIDDEN = 'FORBIDDEN',
    UNKNOWN = 'UNKNOWN',
    BAD_REQUEST = 'BAD_REQUEST',
    NOT_FOUND = 'NOT_FOUND',
    UNPROCESSABLE = 'UNPROCESSABLE'
}

export enum LANG {
    UA = 'ua',
    DE = 'de'
}
