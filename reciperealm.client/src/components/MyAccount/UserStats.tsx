import { Fragment, useEffect, useState } from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { IUserLoginValues } from "../../abstractions/identity";
import { useGetUserRecipesStats } from "../../customHooks/recipes/useGetUserRecipesStats";
import { UserRecipesCountAndStatsQueryReturn } from "../../abstractions/recipes";

const UserStats = () => {
  const [recipesStats, setRecipesStats] =
    useState<UserRecipesCountAndStatsQueryReturn>();

  useEffect(() => {
    useEffectHandler();
  }, [recipesStats]);

  const user = useAuthUser<IUserLoginValues>();
  const { getStats } = useGetUserRecipesStats();
  const useEffectHandler = async () => {
    setRecipesStats(await getStats(user?.email!));
  };

  return (
    <Fragment>
      <h1 className="heading">{user?.username}</h1>
      <div className="stats">
        <div className="col-3">
          <h4>{recipesStats?.recipesCount}</h4>
          <p>Recipes</p>
        </div>
        <div className="col-3">
          <h4>{recipesStats?.upVotes}</h4>
          <p>UpVotes</p>
        </div>
        <div className="col-3">
          <h4>{recipesStats?.downVotes}</h4>
          <p>DownVotes</p>
        </div>
        <div className="col-3">
          <h4>{recipesStats?.savesCount}</h4>
          <p>Saves</p>
        </div>
      </div>
    </Fragment>
  );
};

export default UserStats;
