import { ChangeEvent } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLazyQuery } from "@apollo/client";
import {
  CheckEmailAvailabilityDocument,
  CheckUsernameAvailabilityDocument,
} from "../generted/graphql";

import styles from "./LoginPage.module.css";
type FormValues = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormValues>({
    mode: "onBlur",
    reValidateMode: "onBlur",
  });
  const [checkUsernameQuery, { data: usernameQueryData }] = useLazyQuery(
    CheckUsernameAvailabilityDocument
  );
  const [checkEmailQuery, { data: emailQuerydata }] = useLazyQuery(
    CheckEmailAvailabilityDocument
  );

  let typingTimer: ReturnType<typeof setTimeout>;
  const onChangeTimeoutHandler = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(async () => {
      switch (event.target.name) {
        case "username":
          await checkUsernameQuery({
            variables: { username: event.target.value },
          });
          break;
        case "email":
          await checkEmailQuery({
            variables: { email: event.target.value },
          });
          break;
      }
    }, 1000);
  };

  const registerHandler: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(registerHandler)}>
      <h1 className={styles.pageInfo}>Register</h1>
      {errors.username && (
        <p className="text-danger">{errors.username.message}</p>
      )}
      <div className="form-outline mb-4">
        <input
          type="username"
          id="username"
          className="form-control"
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
          onChange={onChangeTimeoutHandler}
        />
        <label className="form-label" htmlFor="email">
          Username
        </label>
      </div>

      <div className="form-outline mb-4">
        {errors.email && <p className="text-danger">{errors.email.message}</p>}
        <input
          type="email"
          id="email"
          className="form-control"
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
          onChange={onChangeTimeoutHandler}
        />
        <label className="form-label" htmlFor="email">
          Email address
        </label>
      </div>

      <div className="form-outline mb-4">
        {errors.password && (
          <p className="text-danger">{errors.password.message}</p>
        )}
        <input
          defaultValue=""
          {...register("password", {
            required: "This is reqiured",
            minLength: { value: 8, message: "Min length 8" },
            maxLength: { value: 20, message: "Max length 20" },
          })}
          type="password"
          name="password"
          id="password"
          className="form-control"
        />
        <label className="form-label" htmlFor="password">
          Password
        </label>
      </div>

      <div className="form-outline mb-4">
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
          className="form-control"
        />
        <label className="form-label" htmlFor="confirmPassword">
          Confirm Password
        </label>
      </div>

      <button type="submit" className="btn btn-primary btn-block mb-4">
        Register
      </button>
    </form>
  );
};

export default RegisterPage;
function trigger() {
  throw new Error("Function not implemented.");
}
