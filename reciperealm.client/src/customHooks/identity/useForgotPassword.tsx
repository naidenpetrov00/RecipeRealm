import { useMutation } from "@apollo/client";

import {
  ForgotPasswordPayload,
  ForgotPasswordDocument,
} from "../../generted/graphql";
import { onErrorHandler } from "../helpers";


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
