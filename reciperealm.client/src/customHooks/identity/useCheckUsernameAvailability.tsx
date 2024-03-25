import { useLazyQuery } from "@apollo/client";

import {
  CheckUsernameAvailabilityQuery,
  CheckUsernameAvailabilityDocument,
} from "../../generted/graphql";

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
