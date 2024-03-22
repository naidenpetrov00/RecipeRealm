import { ChangeEvent, useRef } from "react";
import { useLazyQuery } from "@apollo/client";
import { SubmitHandler, useForm } from "react-hook-form";

import {
  CheckEmailAvailabilityDocument,
  CheckUsernameAvailabilityDocument,
} from "../../generted/graphql";
import {
  useCheckEmailAvailability,
  useCheckUsernameAvailability,
  useRegisterUser,
} from "../../customHooks/identity";
import {
  IUserRegisterValues,
  InvalidInputErrorMessges,
} from "../../abstractions/identity";
import { NavLink } from "react-router-dom";
import ReCaptcha from "../../components/ReCaptcha";

import styles from "./LoginPage.module.css";
import ReCAPTCHA from "react-google-recaptcha";

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

  const { checkUsername, usernameQueryData } = useCheckUsernameAvailability();
  const onChangeUsernameHandler = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const username = event.target.value;
    checkUsername(username);
  };
  const { checkEmail, emailQuerydata } = useCheckEmailAvailability();
  const onChangeEmailHandler = async (event: ChangeEvent<HTMLInputElement>) => {
    const email = event.target.value;
    checkEmail(email);
  };

  const reCaptchaRef = useRef<ReCAPTCHA>(null);
  const { registerHandler } = useRegisterUser();
  const onSubmitHandler: SubmitHandler<IUserRegisterValues> = async (data) => {
    reCaptchaRef.current?.execute();
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
            minLength: {
              value: 8,
              message: InvalidInputErrorMessges.MinLength8,
            },
            maxLength: {
              value: 20,
              message: InvalidInputErrorMessges.MaxLength20,
            },
            required: InvalidInputErrorMessges.EmptyInput,
            validate: (): string | undefined => {
              return usernameQueryData?.checkUsernameAvailability
                ? undefined
                : InvalidInputErrorMessges.UsernameIsNotAvailable;
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
            required: InvalidInputErrorMessges.EmptyInput,
            pattern: {
              message: InvalidInputErrorMessges.InvalidEmail,
              value: /^\S+@\S+$/i,
            },
            validate: (): string | undefined => {
              return emailQuerydata?.checkEmailAvailability
                ? undefined
                : InvalidInputErrorMessges.AccountWithThisEmailAlreadyExists;
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
            required: InvalidInputErrorMessges.EmptyInput,
            minLength: {
              value: 8,
              message: InvalidInputErrorMessges.MinLength8,
            },
            maxLength: {
              value: 20,
              message: InvalidInputErrorMessges.MaxLength20,
            },
            pattern: {
              value: /(?=.*[A-Z])(?=.*\d).+/,
              message: InvalidInputErrorMessges.PassportReqUppercaseAndNumber,
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
            required: InvalidInputErrorMessges.EmptyInput,
            validate: (value: string) =>
              value === watch("password") ||
              InvalidInputErrorMessges.PasswordsMustMatch,
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
      <ReCaptcha reCaptchaRef={reCaptchaRef} />
      <button
        type="submit"
        className={"btn btn-primary btn-block mb-4 " + styles.button}
      >
        Register
      </button>
      <div className="text-center">
        <p>
          Already have account? <NavLink to="/login">Sign In</NavLink>
        </p>
      </div>
    </form>
  );
};

export default RegisterPage;
