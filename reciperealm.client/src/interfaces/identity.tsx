export interface IUserLoginValues {
  email: string;
  password: string;
}

export interface IUserRegisterValues extends IUserLoginValues {
  username: string;
  confirmPassword: string;
}
