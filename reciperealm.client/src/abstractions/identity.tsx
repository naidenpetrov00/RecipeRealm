export interface IUserLoginValues {
  username: string;
  email: string;
  password: string;
}

export interface IUserRegisterValues extends IUserLoginValues {
  confirmPassword: string;
}
