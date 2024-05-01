import { useLazyQuery } from "@apollo/client";
import {
  GetUserRecipesPayload,
  UserRecipesDocument,
  UserRecipesQuery,
} from "../../generted/graphql";
import { onErrorHandler } from "../helpers";

interface IGetUserRecipesResult {
  getUserRecipes: (email: string) => Promise<any>;
}
export const useGetUserRecipes = (): IGetUserRecipesResult => {
  const [getUserRecipesQuery] = useLazyQuery(UserRecipesDocument);

  const getUserRecipes = async (email: string) => {
    const result = await getUserRecipesQuery({
      variables: { email },
      onError: onErrorHandler,
    });
    console.log("from custom hook");

    return result.data?.userRecipes;
  };

  return { getUserRecipes };
};
