import { Fragment } from "react";

import styles from "./LoginPage.module.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLazyQuery, useMutation } from "@apollo/client";
import { LoginUserDocument } from "../generted/graphql";
import { ActionFunction, Form, redirect, useNavigate } from "react-router-dom";

type FormValues = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  const [loginQuery] = useMutation(LoginUserDocument);

  const loginHandler: SubmitHandler<FormValues> = async (data) => {};

  return (
    <Fragment>
      <Form className={styles.form} onSubmit={handleSubmit(loginHandler)}>
        <h1 className={styles.pageInfo}>Login</h1>
        <div className={"form-outline mb-4 " + styles.outline}>
          {errors.email && (
            <p className="text-danger">{errors.email.message}</p>
          )}
          <input
            type="email"
            id="form2Example1"
            className="form-control"
            {...register("email", {
              required: "This is required",
              pattern: { message: "Provide valid email", value: /^\S+@\S+$/i },
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
              minLength: { value: 8, message: "Min length 8" },
              maxLength: { value: 20, message: "Max length 20" },
            })}
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

        <button
          type="submit"
          className={"btn btn-primary btn-block mb-4 " + styles.button}
        >
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
      </Form>
    </Fragment>
  );
};

export default LoginPage;

export const loginAction: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const { email, password } = Object.fromEntries(formData);
  const [loginQuery] = useMutation(LoginUserDocument);
  const result = await loginQuery({
    variables: {
      input: {
        email: email.toString(),
        password: password.toString(),
      },
    },
  });

  console.log(result);
  return redirect("/");
};
