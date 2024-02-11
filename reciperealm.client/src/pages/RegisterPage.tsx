import { ChangeEvent, Fragment, useState } from "react";

import styles from "./LoginPage.module.css";
import { SubmitHandler, useForm } from "react-hook-form";

type FormValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    watch,
  } = useForm<FormValues>();

  const registerHandler: SubmitHandler<FormValues> = (data) => {
    console.log(data.email);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(registerHandler)}>
      <h1 className={styles.pageInfo}>Register</h1>
      {errors.email && errors.email.type === "required" && (
        <p>{errors.email.message}</p>
      )}
      {errors.email && errors.email.message === "Provide valid email" && (
        <p>{errors.email.message}</p>
      )}
      <div className="form-outline mb-4">
        <input
          type="email"
          id="email"
          className="form-control"
          {...register("email", {
            required: "This is reqiured",
            pattern: { message: "Provide valid email", value: /^\S+@\S+$/i },
          })}
          onBlur={() => trigger("email")}
        />
        <label className="form-label" htmlFor="email">
          Email address
        </label>
      </div>

      <div className="form-outline mb-4">
        {errors.password && errors.password.type === "required" && (
          <p>{errors.password.message}</p>
        )}
        {errors.password && errors.password.type === "minLength" && (
          <p>{errors.password.message}</p>
        )}
        <input
          {...register("password", {
            required: "This is reqiured",
            minLength: {
              value: 8,
              message: "Min length 8",
            },
          })}
          onBlur={() => trigger("password")}
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
        {errors.confirmPassword &&
          errors.confirmPassword.type === "required" && (
            <p>{errors.confirmPassword.message}</p>
          )}
        {errors.confirmPassword &&
          errors.confirmPassword.type === "validate" && (
            <p>{errors.confirmPassword.message}</p>
          )}
        <input
          {...register("confirmPassword", {
            required: "This is reqiured",
            validate: (value: string) =>
              value === watch("password") || "Password must match",
          })}
          onBlur={() => trigger("confirmPassword")}
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
