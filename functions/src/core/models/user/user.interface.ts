import { Timestamp } from 'firebase-admin/firestore';

export type TUserRole = 'admin' | 'superadmin';
export type TClaim = TUserRole | 'authenticated';

export interface IUserReq {
    name: string;
    email: string;
    password: string;
    adminKey?: string;
}

export interface IUserRes {
    id: string;
    name: string;
    email: string;
    role: TUserRole;
    updatedAt: Timestamp;
    createdAt: Timestamp;
}

export interface IUserRegister {
    name: string;
    email: string;
    role: TUserRole;
    password: string;
}

export interface IUser {
    id: string;
    name: string;
    email: string;
    role: TUserRole;
    updatedAt: Timestamp;
    createdAt: Timestamp;
    password: string;
}
