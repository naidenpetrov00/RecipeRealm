import { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLazyQuery, useMutation } from "@apollo/client";

import {
  CheckEmailAvailabilityDocument,
  CheckUsernameAvailabilityDocument,
  RegisterUserDocument,
} from "../generted/graphql";
import {
  IUserLoginValues,
  IUserRegisterValues,
} from "../abstractions/identity";

import styles from "./LoginPage.module.css";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { useRegisterUser } from "../customHooks/identity";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IUserRegisterValues>({
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  const [checkEmailQuery, { data: emailQuerydata }] = useLazyQuery(
    CheckEmailAvailabilityDocument
  );
  const [checkUsernameQuery, { data: usernameQueryData }] = useLazyQuery(
    CheckUsernameAvailabilityDocument
  );
  const onChangeUsernameHandler = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    await checkUsernameQuery({
      variables: { username: event.target.value },
    });
  };
  const onChangeEmailHandler = async (event: ChangeEvent<HTMLInputElement>) => {
    await checkEmailQuery({
      variables: { email: event.target.value },
    });
  };

  const { registerHandler } = useRegisterUser();
  const onSubmitHandler: SubmitHandler<IUserRegisterValues> = async (data) => {
    registerHandler(data.username, data.email, data.password);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmitHandler)}>
      <h1 className={styles.pageInfo}>Register</h1>
      <div className={"form-outline mb-4 " + styles.outline}>
        {errors.username && (
          <p className="text-danger">{errors.username.message}</p>
        )}
        <input
          type="username"
          id="username"
          className={"form-control " + styles.input}
          autoComplete="off"
          {...register("username", {
            minLength: { value: 6, message: "Min length 6" },
            maxLength: { value: 20, message: "Max length 20" },
            required: "This is reqiured",
            validate: (): string | undefined => {
              return usernameQueryData?.checkUsernameAvailability
                ? undefined
                : "Username is not available!";
            },
          })}
          onChange={onChangeUsernameHandler}
        />
        <label className="form-label" htmlFor="email">
          Username
        </label>
      </div>

      <div className={"form-outline mb-4 " + styles.outline}>
        {errors.email && <p className="text-danger">{errors.email.message}</p>}
        <input
          type="email"
          id="email"
          className={"form-control " + styles.input}
          autoComplete="off"
          {...register("email", {
            required: "This is reqiured",
            pattern: { message: "Provide valid email", value: /^\S+@\S+$/i },
            validate: (): string | undefined => {
              return emailQuerydata?.checkEmailAvailability
                ? undefined
                : "Account with this Email already exists";
            },
          })}
          onChange={onChangeEmailHandler}
        />
        <label className="form-label" htmlFor="email">
          Email address
        </label>
      </div>

      <div className={"form-outline mb-4 " + styles.outline}>
        {errors.password && (
          <p className="text-danger">{errors.password.message}</p>
        )}
        <input
          defaultValue=""
          {...register("password", {
            required: "This is reqiured",
            minLength: { value: 8, message: "Min length 8" },
            maxLength: { value: 20, message: "Max length 20" },
            pattern: {
              value: /(?=.*[A-Z])(?=.*\d).+/,
              message:
                "Passport must contain at least one uppercase letter and one number",
            },
          })}
          type="password"
          name="password"
          id="password"
          className={"form-control " + styles.input}
        />
        <label className="form-label" htmlFor="password">
          Password
        </label>
      </div>

      <div className={"form-outline mb-4 " + styles.outline}>
        {errors.confirmPassword && (
          <p className="text-danger">{errors.confirmPassword.message}</p>
        )}
        <input
          {...register("confirmPassword", {
            required: "This is reqiured",
            validate: (value: string) =>
              value === watch("password") || "Password must match",
          })}
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          className={"form-control " + styles.input}
        />
        <label className="form-label" htmlFor="confirmPassword">
          Confirm Password
        </label>
      </div>

      <button
        type="submit"
        className={"btn btn-primary btn-block mb-4 " + styles.button}
      >
        Register
      </button>
    </form>
  );
};

export default RegisterPage;
