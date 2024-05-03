import { useEffect, useState } from "react";
import { useGetUserRecipes } from "../../customHooks/recipes/useGetUserRecipes";
import MyRecipePost from "./MyRecipePost";
import { UserRecipesQueryReturn } from "../../abstractions/recipes";

const MyRecipes = () => {
  const { getUserRecipes } = useGetUserRecipes();
  const [recipesData, setRecipesData] = useState<UserRecipesQueryReturn>();

  useEffect(() => {
    useEffectCallback();
  }, []);

  const useEffectCallback = async () => {
    if (!recipesData) {
      setRecipesData(await getUserRecipes("Test123@gmail.com"));
    }
  };

  return (
    <section>
      <h1>MyRecipes</h1>
      <div className="container main-section border">
        {recipesData?.error && <p>{recipesData.error}</p>}
        {recipesData?.userRecipes &&
          recipesData.userRecipes.map((r) => (
            <MyRecipePost key={r.name} recipeInfo={r} />
          ))}
      </div>
    </section>
  );
};

export default MyRecipes;
