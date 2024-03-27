import { useMutation } from "@apollo/client";
import { ChangePasswordDocument } from "../../generted/graphql";
import { onErrorHandler } from "../helpers";
import { useNavigate } from "react-router-dom";

interface ChangePasswordResult {
  changePassword: (email: string, newPassword: string) => Promise<void>;
}
export const useChangePassword = (): ChangePasswordResult => {
  const [changePasswordMutation] = useMutation(ChangePasswordDocument);
  const navigate = useNavigate();

  const changePassword = async (email: string, newPassword: string) => {
    var result = await changePasswordMutation({
      variables: { userInput: { email, newPassword } },
      onError: onErrorHandler,
    });

    if (
      result.data?.changePassword.passwordChanged &&
      !result.data.changePassword.errors
    ) {
      alert("Login with your new credentials");
      navigate("/login");
    } else if (result.data?.changePassword.errors) {
      for (const error of result.data?.changePassword.errors) {
        alert(`${error.code}\n${error.description}`);
      }
    }
  };

  return { changePassword };
};
