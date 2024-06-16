import { useMutation } from "@apollo/client";

import { onErrorHandler } from "../helpers";
import { AddRecipeDocument } from "../../generted/graphql";
import { IAddRecipeInputData } from "../../abstractions/recipes";

interface AddRecipeResult {
  addRecipe: (data: IAddRecipeInputData) => Promise<void>;
}
export const useAddRecipe = (): AddRecipeResult => {
  const [addRecipeMutation] = useMutation(AddRecipeDocument, {
    errorPolicy: "all",
  });
  const addRecipe = async (data: IAddRecipeInputData) => {
    const result = await addRecipeMutation({
      variables: {
        userInput: {
          name: data.name,
          userEmail: data.userEmail,
          recipeImages: data.recipeImages,
          cookingSteps: data.cookingSteps,
          difficulty: data.difficulty,
          cookingTime: data.cookingTime,
        },
      },
      onError: onErrorHandler,
    });

    const resultData = result.data?.addRecipe;
    if (resultData?.recipeAdded && !resultData.error) {
      alert("Recipe Added");
    } else {
      alert(resultData?.error);
    }
  };

  return { addRecipe };
};
