import { Fragment } from "react";

import styles from "./LoginPage.module.css";
import { FormSubmitHandler, SubmitHandler, useForm } from "react-hook-form";

type FormValues = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const {
    register,
    trigger,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>();

  const loginHandler: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };

  return (
    <Fragment>
      <form className={styles.form} onSubmit={handleSubmit(loginHandler)}>
        <h1 className={styles.pageInfo}>Login</h1>
        <div className="form-outline mb-4">
          {errors.email?.type === "required" && <p>{errors.email.message}</p>}
          {errors.email?.type === "pattern" && <p>{errors.email.message}</p>}
          <input
            type="email"
            id="form2Example1"
            className="form-control"
            {...register("email", {
              required: "This is required",
              pattern: { message: "Provide valid email", value: /^\S+@\S+$/i },
            })}
            onBlur={() => trigger("email")}
          />
          <label className="form-label" htmlFor="form2Example1">
            Email address
          </label>
        </div>

        {errors.password && <p>{errors.password.message}</p>}
        <div className="form-outline mb-4">
          <input
            type="password"
            id="form2Example2"
            className="form-control"
            {...register("password", {
              required: "This is required",
            })}
            onBlur={() => trigger("password")}
          />
          <label className="form-label" htmlFor="form2Example2">
            Password
          </label>
        </div>

        <div className="row mb-4">
          <div className="col d-flex justify-content-center">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="form2Example31"
              />
              <label className="form-check-label" htmlFor="form2Example31">
                Remember me
              </label>
            </div>
          </div>

          <div className="col">
            <a href="#!">Forgot password?</a>
          </div>
        </div>

        <button type="submit" className="btn btn-primary btn-block mb-4">
          Sign in
        </button>

        <div className="text-center">
          <p>
            Not a member? <a href="#!">Register</a>
          </p>
          <p>or sign up with:</p>
          <button type="button" className="btn btn-link btn-floating mx-1">
            <i className="fab fa-facebook-f"></i>
          </button>

          <button type="button" className="btn btn-link btn-floating mx-1">
            <i className="fab fa-google"></i>
          </button>

          <button type="button" className="btn btn-link btn-floating mx-1">
            <i className="fab fa-twitter"></i>
          </button>

          <button type="button" className="btn btn-link btn-floating mx-1">
            <i className="fab fa-github"></i>
          </button>
        </div>
      </form>
    </Fragment>
  );
};

export default LoginPage;
