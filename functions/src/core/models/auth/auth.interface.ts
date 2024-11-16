export interface ILoginReq {
  email: string;
  password: string;
  adminKey?: string;
}

export interface ILoginRes {
  jwt: string;
}

export interface IParsedJwt {
  id: string;
}
