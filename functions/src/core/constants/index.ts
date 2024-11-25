export enum KEYS {
    ADMIN_KEY = 'ADMIN_KEY',
    JWT_SECRET = 'JWT_SECRET',
    SUPERADMIN_KEY = 'SUPERADMIN_KEY',
    MODE = 'MODE',
    SALT_ROUNDS = 'SALT_ROUNDS',
    JWT_EXPIRE = 'JWT_EXPIRE',
    UI_ORIGIN = 'UI_ORIGIN'
}

export enum COLLECTION {
    USERS = 'users',
    ARTICLES = 'articles'
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
    UNKNOWN = 'UNKNOWN'
}
