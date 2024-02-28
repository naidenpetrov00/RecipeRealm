import { useMutation } from "@apollo/client";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { useNavigate } from "react-router-dom";
import { IUserLoginValues } from "../abstractions/identity";
import { LoginUserDocument, RegisterUserDocument } from "../generted/graphql";
import { useDispatch } from "react-redux";
import { authenticated } from "../store/authSlice";

interface LoginHandlerResult {
  loginHandler: (email: string, password: string) => Promise<void>;
}
export const useLoginUser = (): LoginHandlerResult => {
  const signIn = useSignIn<IUserLoginValues>();
  const navigate = useNavigate();
  const [loginQuery] = useMutation(LoginUserDocument);
  const dispatch = useDispatch();

  const loginHandler = async (email: string, password: string) => {
    const result = await loginQuery({
      variables: {
        input: {
          email: email,
          password: password,
        },
      },
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
      dispatch(authenticated());
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

  const registerHandler = async (
    username: string,
    email: string,
    password: string
  ) => {
    const result = await registerMutation({
      variables: {
        input: {
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
      navigate("/");
    } else if (result.data?.registerUser.errors) {
      for (const error of result.data?.registerUser.errors) {
        alert(`${error.code}: ${error.description}`);
      }
    }
  };

  return { registerHandler };
};
