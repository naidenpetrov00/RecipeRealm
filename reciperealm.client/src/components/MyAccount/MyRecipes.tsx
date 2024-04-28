import { useEffect } from "react";
import { useGetUserRecipes } from "../../customHooks/recipes/useGetUserRecipes";

const MyRecipes = () => {
  const { getUserRecipes } = useGetUserRecipes();

  const ClickHandler = () => {
    getUserRecipes("Test123@gmail.com");
  };
  return (
    <section>
      <h1>MyRecipes</h1>
      <button onClick={ClickHandler}></button>
    </section>
  );
};

export default MyRecipes;
