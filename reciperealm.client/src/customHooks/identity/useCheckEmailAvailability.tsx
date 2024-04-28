import { useLazyQuery } from "@apollo/client";

import {
  CheckEmailAvailabilityQuery,
  CheckEmailAvailabilityDocument,
} from "../../generted/graphql";

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
