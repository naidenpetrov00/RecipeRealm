import { useMutation } from "@apollo/client";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { useNavigate } from "react-router-dom";
import { IUserLoginValues } from "../abstractions/identity";
import { LoginUserDocument } from "../generted/graphql";

interface LoginHandlerResult {
  loginHandler: (email: string, password: string) => Promise<void>;
}

export const useLoginUser = (): LoginHandlerResult => {
  const signIn = useSignIn<IUserLoginValues>();
  const navigate = useNavigate();
  const [loginQuery] = useMutation(LoginUserDocument);

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
      navigate("/");
    } else if (result.data?.loginUser.error) {
      const error = result.data?.loginUser.error;
      alert(`${error.code}: ${error.description}`);
    }
  };

  return { loginHandler };
};
