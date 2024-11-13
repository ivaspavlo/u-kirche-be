export type TUserRole = 'admin' | 'superadmin';

export interface IUserReq {
  name: string;
  email: string;
  password: string;
  adminKey: string;
}

export interface IUserRes {
  id: string;
  name: string;
  email: string;
  role: TUserRole;
  lastUpdated: string;
  created: string;
}

export interface IUserFirestore {
  name: string;
  email: string;
  role: TUserRole;
  password: string;
}
