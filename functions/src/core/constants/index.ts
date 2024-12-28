export enum GOOGLE_SECRET_KEY {
    ADMIN_KEY = 'ADMIN_KEY'
}

export enum ENV_KEY {
    MODE = 'MODE',
    JWT_SECRET = 'JWT_SECRET',
    SALT_ROUNDS = 'SALT_ROUNDS',
    JWT_EXP = 'JWT_EXPIRE',
    UI_ORIGIN = 'UI_ORIGIN',
    SEND_GRID_SECRET = 'SEND_GRID_SECRET'
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
