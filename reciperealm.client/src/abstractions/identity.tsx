export interface  IUserLoginValues {
  username: string;
  email: string;
  password: string;
}
export interface IUserLoginValuesWithPicture extends IUserLoginValues {
  profilePicture: string;
}
export interface IUserRegisterValues extends IUserLoginValues {
  confirmPassword: string;
}

export interface IChangePasswordValues {
  password: string;
  confirmPassword: string;
}

export enum InvalidInputErrorMessges {
  InvalidEmail = "Provide valid email!",
  EmptyInput = "This is required!",
  MinLength8 = "Min length 8!",
  MaxLength20 = "Max length 20!",
  UsernameIsNotAvailable = "Username is not available!",
  AccountWithThisEmailAlreadyExists = "Account with this Email already exists!",
  PassportReqUppercaseAndNumber = "Passport must contain at least one uppercase letter and one number!",
  PasswordsMustMatch = "Passwords must match!",
}

export type InvalidInputErrorTypes = "email" | "password";
