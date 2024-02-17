import { SubmitHandler, useForm } from "react-hook-form";

import styles from "./LoginPage.module.css";
import { ChangeEvent } from "react";

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
    trigger,
    watch,
  } = useForm<FormValues>();

  let typingTimer: ReturnType<typeof setTimeout>;
  const checkUsernameHandler = (event: ChangeEvent<HTMLInputElement>) => {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(checkUsername, 1000);
  };
  const checkUsername = () => {
    
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
          {...register("username", {
            required: "This is reqiured",
            minLength: { value: 8, message: "Min length 6" },
            maxLength: { value: 20, message: "Max length 20" },
          })}
          onBlur={() => trigger("username")}
          onChange={checkUsernameHandler}
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
        {errors.password && (
          <p className="text-danger">{errors.password.message}</p>
        )}
        <input
          {...register("password", {
            required: "This is reqiured",
            minLength: { value: 8, message: "Min length 8" },
            maxLength: { value: 20, message: "Max length 20" },
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
        {errors.confirmPassword && (
          <p className="text-danger">{errors.confirmPassword.message}</p>
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
