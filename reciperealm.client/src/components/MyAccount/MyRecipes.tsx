import { useEffect, useState } from "react";
import { useGetUserRecipes } from "../../customHooks/recipes/useGetUserRecipes";
import RecipePost from "./MyRecipePost";

const MyRecipes = () => {
  const { getUserRecipes } = useGetUserRecipes();
  const [recipesData, setRecipesData] = useState(null);

  useEffect(() => {}, [recipesData]);

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
        <RecipePost />
        <RecipePost />
        <RecipePost />
      </div>
    </section>
  );
};

export default MyRecipes;
