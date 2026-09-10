export interface IUser {
  id: string;
  email: string;
  name: string;
  description?: string;
}

export interface ILoginInput {
  email: string;
  password: string;
}

export interface ISignUpInput {
  email: string;
  password: string;
  name: string;
  description?: string;
}

export interface IAuthResponse {
  user: IUser;
  token: string;
}