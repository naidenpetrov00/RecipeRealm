import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { useMutation, useLazyQuery } from "@apollo/client";

import {
  CheckEmailAvailabilityDocument,
  CheckEmailAvailabilityQuery,
  CheckUsernameAvailabilityDocument,
  CheckUsernameAvailabilityQuery,
  ForgotPasswordDocument,
  ForgotPasswordPayload,
  LoginUserDocument,
  RegisterUserDocument,
} from "../generted/graphql";
import { authenticated } from "../store/authSlice";
import { AppDispatch, RootState } from "../store/store";
import { IUserLoginValues } from "../abstractions/identity";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";

export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

interface ForgotPasswordHandlerResult {
  forgotPasswordHandler: (email: string) => Promise<ForgotPasswordPayload>;
}
export const useForgotPassword = (): ForgotPasswordHandlerResult => {
  const [forgotPasswordMutation] = useMutation(ForgotPasswordDocument);

  const forgotPasswordHandler = async (email: string) => {
    const result = await forgotPasswordMutation({
      variables: { userInput: { email } },
      onError: onErrorHandler,
    });
    const resultPayload = result.data?.forgotPassword;

    if (!resultPayload) {
      const defaultPayload: ForgotPasswordPayload = {
        emailSent: false,
        error: "No response received from server.",
      };
      alert(defaultPayload.error);
      return defaultPayload;
    }
    if (!resultPayload?.emailSent && resultPayload!.error.length > 0) {
      alert(resultPayload?.error);
    }

    return resultPayload;
  };

  return { forgotPasswordHandler };
};

interface LoginHandlerResult {
  loginHandler: (email: string, password: string) => Promise<void>;
}
export const useLoginUser = (): LoginHandlerResult => {
  const signIn = useSignIn<IUserLoginValues>();
  const navigate = useNavigate();
  const [loginQuery] = useMutation(LoginUserDocument, { errorPolicy: "all" });
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
      onError: onErrorHandler,
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
      onError: onErrorHandler,
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

interface CheckUsernameAvailabilityResult {
  checkUsername: (username: string) => Promise<void>;
  usernameQueryData?: CheckUsernameAvailabilityQuery;
}

export const useCheckUsernameAvailability =
  (): CheckUsernameAvailabilityResult => {
    const [checkUsernameQuery, { data: usernameQueryData }] = useLazyQuery(
      CheckUsernameAvailabilityDocument
    );

    const checkUsername = async (username: string) => {
      await checkUsernameQuery({
        variables: { username },
      });
    };

    return { checkUsername, usernameQueryData };
  };

interface CheckEmailAvailabilityResult {
  checkEmail: (email: string) => Promise<void>;
  emailQuerydata?: CheckEmailAvailabilityQuery;
}

export const useCheckEmailAvailability = (): CheckEmailAvailabilityResult => {
  const [checkEmailQuery, { data: emailQuerydata }] = useLazyQuery(
    CheckEmailAvailabilityDocument
  );

  const checkEmail = async (email: string) => {
    await checkEmailQuery({
      variables: { email },
    });
  };

  return { checkEmail, emailQuerydata };
};

const onErrorHandler = ({ networkError }: { networkError: any }) => {
  for (const item of networkError!.result.errors) {
    alert(`${item.extensions.code}: \n${item.message}`);
  }
};
