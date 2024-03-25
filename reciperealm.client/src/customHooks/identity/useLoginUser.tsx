import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";

import { authenticated } from "../../store/authSlice";
import { LoginUserDocument } from "../../generted/graphql";
import { useAppDispatch, onErrorHandler } from "../helpers";
import { IUserLoginValues } from "../../abstractions/identity";

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
