import { useLazyQuery } from "@apollo/client";

import { onErrorHandler } from "../helpers";
import {
  UserRecipesDocument,
  UserRecipesQueryReturn,
} from "../../generted/graphql";

interface IGetUserRecipesResult {
  getUserRecipes: (
    email: string
  ) => Promise<UserRecipesQueryReturn | undefined>;
}
export const useGetUserRecipes = (): IGetUserRecipesResult => {
  const [getUserRecipesQuery] = useLazyQuery(UserRecipesDocument);

  const getUserRecipes = async (email: string) => {
    const result = await getUserRecipesQuery({
      variables: { email },
      onError: onErrorHandler,
    });

    return result.data?.userRecipes;
  };

  return { getUserRecipes };
};
