import { getAuth } from 'firebase-admin/auth';
import { DecodedIdToken } from 'firebase-admin/auth';
import { Request } from 'express';

class AuthService {
    public extractBearerToken(req: Request): string {
        const authorization = req.headers.authorization;
        const [scheme, token] = authorization?.split(' ') ?? [];
        return scheme?.toLowerCase() === 'bearer' ? (token ?? '') : '';
    }

    public verifyIdToken(token: string): Promise<DecodedIdToken> {
        return getAuth().verifyIdToken(token, true);
    }
}

export const authService: AuthService = new AuthService();
