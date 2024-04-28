import { useLazyQuery } from "@apollo/client";
import { UserRecipesDocument } from "../../generted/graphql";

interface IGetUserRecipesResult {
  getUserRecipes: (email: string) => Promise<void>;
}
export const useGetUserRecipes = (): IGetUserRecipesResult => {
  const [getUserRecipesQuery] = useLazyQuery(UserRecipesDocument);

  const getUserRecipes = async (email: string) => {
    const result = await getUserRecipesQuery({
      variables: { email },
    });

    console.log(result.data?.userRecipes.userRecipes[0].name);
  };

  return { getUserRecipes };
};
