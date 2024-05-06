import { useEffect, useState } from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

import MyRecipePost from "../components/MyAccount/MyRecipePost";

import { IUserLoginValues } from "../abstractions/identity";
import { UserRecipesQueryReturn } from "../abstractions/recipes";
import { useGetUserRecipes } from "../customHooks/recipes/useGetUserRecipes";

const MyRecipes = () => {
  const [recipesData, setRecipesData] = useState<UserRecipesQueryReturn>();

  useEffect(() => {
    useEffectCallback();
  }, [recipesData]);

  const user = useAuthUser<IUserLoginValues>();
  const { getUserRecipes } = useGetUserRecipes();
  const useEffectCallback = async () => {
    if (!recipesData) {
      setRecipesData(await getUserRecipes(user?.email!));
    }
  };

  return (
    <div className="container main-section border">
      {recipesData?.error && <p>{recipesData.error}</p>}
      {recipesData?.userRecipes &&
        recipesData.userRecipes.map((r) => (
          <MyRecipePost key={r.name} recipeInfo={r} />
        ))}
    </div>
  );
};

export default MyRecipes;
