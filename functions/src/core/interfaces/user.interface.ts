export type TUserRole = 'admin' | 'superadmin';
export type TClaim = TUserRole | 'authenticated';

export interface IUserRegisterReqRaw {
    name: string;
    email: string;
}

export interface IUserRegisterReqFormatted {
    name: string;
    email: string;
    role: TUserRole;
}

export interface IUserRes {
    id: string;
    name: string;
    email: string;
    role: TUserRole;
    updatedAt: number;
    createdAt: number;
}

export interface IUser {
    id: string;
    name: string;
    email: string;
    role: TUserRole;
    updatedAt: number;
    createdAt: number;
    firebaseUid?: string;
}
