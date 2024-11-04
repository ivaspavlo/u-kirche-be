export type TUserRole = 'admin' | 'superadmin';

export interface IUserBody {
  name: string;
  email: string;
  password: string;
  adminKey: string;
}

export interface IUserClient {
  id: string;
  name: string;
  email: string;
  role: TUserRole;
  lastUpdated: string;
  created: string;
}

export interface IUserFirebase {
  name: string;
  email: string;
  role: TUserRole;
  password: string;
}
