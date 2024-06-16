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

export interface UserRecipesCountAndStatsQueryReturn {
  __typename?: "GetUserRecipesCountAndStatsPayload";
  recipesCount: number;
  upVotes: number;
  downVotes: number;
  savesCount: number;
}

export interface IAddRecipesFormValues {
  name: string;
  recipeImages: string[];
  cookingSteps: string;
  difficulty: DifficultyLevels;
  cookingTime: string;
}
export interface IAddRecipeInputData extends IAddRecipesFormValues {
  userEmail: string;
}

export enum InvalidInputErrorMessges {
  InvalidEmail = "Provide valid email!",
  EmptyInput = "This is required!",
  MinLengthName = "Min length 5!",
  MaxLengthName = "Max length 100!",
  MinLengthSteps = "Min length 10!",
  MaxLengthSteps = "Max length 2000!",
  UsernameIsNotAvailable = "Username is not available!",
  AccountWithThisEmailAlreadyExists = "Account with this Email already exists!",
  PassportReqUppercaseAndNumber = "Passport must contain at least one uppercase letter and one number!",
  PasswordsMustMatch = "Passwords must match!",
}
