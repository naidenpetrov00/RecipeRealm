import { useRef } from "react";
import { NavLink } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { SubmitHandler, useForm } from "react-hook-form";

import {
  IUserLoginValues,
  InvalidInputErrorMessges,
} from "../../abstractions/identity";
import ReCaptcha from "../../components/ReCaptcha";
import { useLoginUser } from "../../customHooks/identity/useLoginUser";

import styles from "./LoginPage.module.css";

const LoginPage = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IUserLoginValues>({
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  const reCaptchaRef = useRef<ReCAPTCHA>(null);
  const { loginHandler } = useLoginUser();
  const onSubmitHandler: SubmitHandler<IUserLoginValues> = async (data) => {
    reCaptchaRef.current?.execute();
    await loginHandler(data.email, data.password);
  };

  return (
    <form
      method="POST"
      className={styles.form}
      onSubmit={handleSubmit(onSubmitHandler)}
    >
      <h1 className={styles.pageInfo}>Login</h1>
      <div className={"form-outline mb-4 " + styles.outline}>
        {errors.email && <p className="text-danger">{errors.email.message}</p>}
        <input
          type="email"
          id="form2Example1"
          className="form-control"
          {...register("email", {
            required: InvalidInputErrorMessges.EmptyInput,
            pattern: {
              message: InvalidInputErrorMessges.InvalidEmail,
              value: /^\S+@\S+$/i,
            },
          })}
        />
        <label className="form-label" htmlFor="form2Example1">
          Email address
        </label>
      </div>

      <div className={"form-outline mb-4 " + styles.outline}>
        {errors.password && (
          <p className="text-danger">{errors.password.message}</p>
        )}
        <input
          type="password"
          id="form2Example2"
          className="form-control"
          {...register("password", {
            required: "This is required",
            minLength: {
              value: 8,
              message: InvalidInputErrorMessges.MinLength8,
            },
            maxLength: {
              value: 20,
              message: InvalidInputErrorMessges.MaxLength20,
            },
          })}
        />
        <label className="form-label" htmlFor="form2Example2">
          Password
        </label>
      </div>
      <ReCaptcha reCaptchaRef={reCaptchaRef} />
      <button
        type="submit"
        className={"btn btn-primary btn-block mb-4 " + styles.button}
      >
        Sign In
      </button>

      <div className="text-center">
        <NavLink to="/forgot-password">Forgot password?</NavLink>
        <p>
          Not a member? <NavLink to="/register">Register</NavLink>
        </p>
      </div>
    </form>
  );
};

export default LoginPage;
