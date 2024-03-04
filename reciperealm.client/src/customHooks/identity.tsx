import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useSignIn from "react-auth-kit/hooks/useSignIn";

import { AppDispatch, RootState } from "../store/store";
import { IUserLoginValues } from "../abstractions/identity";
import { LoginUserDocument, RegisterUserDocument } from "../generted/graphql";
import { authenticated } from "../store/authSlice";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";

export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

interface LoginHandlerResult {
  loginHandler: (email: string, password: string) => Promise<void>;
}
export const useLoginUser = (): LoginHandlerResult => {
  const signIn = useSignIn<IUserLoginValues>();
  const navigate = useNavigate();
  const [loginQuery, { error: loginQueryError }] =
    useMutation(LoginUserDocument);
  const dispatch = useAppDispatch();
  const isAuthenticatedCookie = useIsAuthenticated();

  const loginHandler = async (email: string, password: string) => {
    const result = await loginQuery({
      variables: {
        userInput: {
          email: email,
          password: password,
        },
      },
      onError: (error) => console.log(error.networkError?.message),
    });

    if (result.data?.loginUser.jwtToken) {
      signIn({
        auth: {
          token: result.data?.loginUser.jwtToken,
          type: "Bearer",
        },
        userState: {
          username: result.data.loginUser.user?.userName!,
          email,
          password,
        },
      });
      dispatch(authenticated(isAuthenticatedCookie()));
      navigate("/");
    } else if (result.data?.loginUser.error) {
      const error = result.data?.loginUser.error;
      alert(`${error.code}: ${error.description}`);
    }
  };

  return { loginHandler };
};

interface RegisterHandlerResult {
  registerHandler: (
    username: string,
    email: string,
    password: string
  ) => Promise<void>;
}
export const useRegisterUser = (): RegisterHandlerResult => {
  const signIn = useSignIn<IUserLoginValues>();
  const navigate = useNavigate();
  const [registerMutation] = useMutation(RegisterUserDocument);
  const dispatch = useAppDispatch();
  const isAuthenticatedCookie = useIsAuthenticated();

  const registerHandler = async (
    username: string,
    email: string,
    password: string
  ) => {
    const result = await registerMutation({
      variables: {
        userInput: {
          username,
          email,
          password,
        },
      },
    });

    if (result.data?.registerUser.jwtToken) {
      signIn({
        auth: {
          token: result.data?.registerUser.jwtToken,
          type: "Bearer",
        },
        userState: {
          username,
          email,
          password,
        },
      });
      dispatch(authenticated(isAuthenticatedCookie()));
      navigate("/");
    } else if (result.data?.registerUser.errors) {
      for (const error of result.data?.registerUser.errors) {
        alert(`${error.code}: ${error.description}`);
      }
    }
  };

  return { registerHandler };
};
