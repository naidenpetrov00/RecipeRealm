import { useEffect } from "react";

const MyRecipes = () => {
  useEffect(() => {
    console.log("from use effect");
  }, []);

  return (
    <section>
      <h1>MyRecipes</h1>
    </section>
  );
};

export default MyRecipes;
