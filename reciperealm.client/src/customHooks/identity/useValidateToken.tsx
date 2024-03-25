import { useLazyQuery } from "@apollo/client";
import {
  ValidateTokenDocument,
} from "../../generted/graphql";

interface CheckTokenValidityResult {
  checkToken: (token: string, email: string) => Promise<boolean | undefined>;
}
export const useValidateToken = (): CheckTokenValidityResult => {
  const [validateTokenQuery] = useLazyQuery(ValidateTokenDocument);

  const checkToken = async (token: string, email: string) => {
    const result = await validateTokenQuery({
      variables: {
        token,
        email,
      },
    });

    return result.data?.validateToken;
  };

  return { checkToken };
};
