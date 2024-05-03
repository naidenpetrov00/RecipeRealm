export interface RecipeModel {
  __typename?: "UserRecipesModel";
  name: string;
  upVotes: number;
  downVotes: number;
  savesCount: number;
  cookingTime: any;
  difficulty: DifficultyLevels;
  cookingSteps: string;
  userId: string;
}
export interface UserRecipesQueryReturn {
  __typename?: "GetUserRecipesPayload";
  error: string;
  userRecipes: Array<RecipeModel>;
}

export enum DifficultyLevels {
  Eazy = "EAZY",
  Hard = "HARD",
  Medium = "MEDIUM",
}
