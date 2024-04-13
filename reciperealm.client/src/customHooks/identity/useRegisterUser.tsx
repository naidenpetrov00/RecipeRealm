import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";

import { authenticated } from "../../store/authSlice";
import { useAppDispatch, onErrorHandler } from "../helpers";
import { RegisterUserDocument } from "../../generted/graphql";
import { IUserLoginValues } from "../../abstractions/identity";
import { changePictureState } from "../../store/profPictureSlice";

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

    const profilePicture = result.data?.registerUser.userProfilePicture!;
    if (result.data?.registerUser.jwtToken && profilePicture) {
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
      dispatch(changePictureState(profilePicture));
      navigate("/");
    } else if (result.data?.registerUser.errors) {
      for (const error of result.data?.registerUser.errors) {
        alert(`${error.code}: ${error.description}`);
      }
    }
  };

  return { registerHandler };
};
