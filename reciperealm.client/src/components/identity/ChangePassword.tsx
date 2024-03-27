import { SubmitHandler, useForm } from "react-hook-form";
import {
  IChangePasswordValues,
  InvalidInputErrorMessges,
} from "../../abstractions/identity";

import styles from "./ChangePassword.module.css";
import { FC, useState } from "react";
import { useChangePassword } from "../../customHooks/identity/useChangePassword";

interface ChangePasswordProps {
  emailOnChangingUser: string;
}
const ChangePassword: FC<ChangePasswordProps> = ({ emailOnChangingUser }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IChangePasswordValues>({
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  const { changePassword } = useChangePassword();
  const onChangePasswordHandler: SubmitHandler<IChangePasswordValues> = async (
    data
  ) => {
    await changePassword(emailOnChangingUser, data.password);
  };

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(onChangePasswordHandler)}
    >
      <h1 className={styles.pageInfo}>Change Password</h1>
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
      <button
        type="submit"
        className={"btn btn-primary btn-block mb-4 " + styles.button}
      >
        Change Password
      </button>
    </form>
  );
};

export default ChangePassword;
