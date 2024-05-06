import { useLazyQuery } from "@apollo/client";
import { UserRecipesCountAndStatsQueryReturn } from "../../abstractions/recipes";
import { UserRecipesCountAndStatsDocument } from "../../generted/graphql";

interface IUseGetUserRecipesStatsResult {
  getStats: (
    email: string
  ) => Promise<UserRecipesCountAndStatsQueryReturn | undefined>;
}
export const useGetUserRecipesStats = (): IUseGetUserRecipesStatsResult => {
  const [getStatsQuery] = useLazyQuery(UserRecipesCountAndStatsDocument);

  const getStats = async (email: string) => {
    const result = await getStatsQuery({
      variables: {
        email,
      },
    });

    return result.data?.userRecipesCountAndStats;
  };

  return { getStats };
};
