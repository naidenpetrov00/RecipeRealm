/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** The `Byte` scalar type represents non-fractional whole numeric values. Byte can represent values between 0 and 255. */
  Byte: { input: any; output: any; }
  /** The `DateTime` scalar represents an ISO-8601 compliant date time type. */
  DateTime: { input: any; output: any; }
  /** The `TimeSpan` scalar represents an ISO-8601 compliant duration type. */
  TimeSpan: { input: any; output: any; }
};

export type ChangePasswordInput = {
  email: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
};

export type ChangePasswordPayload = {
  __typename?: 'ChangePasswordPayload';
  errors: Array<IdentityError>;
  passwordChanged: Scalars['Boolean']['output'];
};

export type ChangeProfilePictureInput = {
  base64Image: Scalars['String']['input'];
  email: Scalars['String']['input'];
};

export type ChangeProfilePicturePayload = {
  __typename?: 'ChangeProfilePicturePayload';
  errors: Array<IdentityError>;
  profilePictureChanged: Scalars['Boolean']['output'];
};

export type Comment = {
  __typename?: 'Comment';
  content: Scalars['String']['output'];
  createdOn: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  parentComment: Comment;
  parentCommentId?: Maybe<Scalars['Int']['output']>;
  recipe: Recipe;
  recipeId?: Maybe<Scalars['Int']['output']>;
  user: RecipeRealmServerUser;
  userId: Scalars['String']['output'];
};

export enum DifficultyLevels {
  Eazy = 'EAZY',
  Hard = 'HARD',
  Medium = 'MEDIUM'
}

export type ForgotPasswordInput = {
  email: Scalars['String']['input'];
};

export type ForgotPasswordPayload = {
  __typename?: 'ForgotPasswordPayload';
  emailSent: Scalars['Boolean']['output'];
  error: Scalars['String']['output'];
};

export type GetUserRecipesPayload = {
  __typename?: 'GetUserRecipesPayload';
  error: Scalars['String']['output'];
  userRecipes: Array<UserRecipesModel>;
};

export type IdentityError = {
  __typename?: 'IdentityError';
  code: Scalars['String']['output'];
  description: Scalars['String']['output'];
};

export type LoginUserInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type LoginUserModel = {
  __typename?: 'LoginUserModel';
  email?: Maybe<Scalars['String']['output']>;
  userName?: Maybe<Scalars['String']['output']>;
};

export type LoginUserPayload = {
  __typename?: 'LoginUserPayload';
  error?: Maybe<IdentityError>;
  jwtToken?: Maybe<Scalars['String']['output']>;
  user?: Maybe<LoginUserModel>;
  userProfilePicture?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword: ChangePasswordPayload;
  changePicture: ChangeProfilePicturePayload;
  forgotPassword: ForgotPasswordPayload;
  loginUser: LoginUserPayload;
  registerUser: RegisterUserPayload;
};


export type MutationChangePasswordArgs = {
  userInput: ChangePasswordInput;
};


export type MutationChangePictureArgs = {
  userInput: ChangeProfilePictureInput;
};


export type MutationForgotPasswordArgs = {
  userInput: ForgotPasswordInput;
};


export type MutationLoginUserArgs = {
  userInput: LoginUserInput;
};


export type MutationRegisterUserArgs = {
  userInput: RegisterUserInput;
};

export type Query = {
  __typename?: 'Query';
  checkEmailAvailability: Scalars['Boolean']['output'];
  checkUsernameAvailability: Scalars['Boolean']['output'];
  userRecipes: GetUserRecipesPayload;
  validateToken: Scalars['Boolean']['output'];
};


export type QueryCheckEmailAvailabilityArgs = {
  email: Scalars['String']['input'];
};


export type QueryCheckUsernameAvailabilityArgs = {
  username: Scalars['String']['input'];
};


export type QueryUserRecipesArgs = {
  email: Scalars['String']['input'];
};


export type QueryValidateTokenArgs = {
  userInput: ValidateTokenInput;
};

export type Recipe = {
  __typename?: 'Recipe';
  comments: Array<Comment>;
  cookingSteps: Scalars['String']['output'];
  cookingTime: Scalars['TimeSpan']['output'];
  difficulty: DifficultyLevels;
  id: Scalars['Int']['output'];
  ingredients: Scalars['String']['output'];
  likes: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  user: RecipeRealmServerUser;
  userId: Scalars['String']['output'];
};

export type RecipeRealmServerUser = {
  __typename?: 'RecipeRealmServerUser';
  accessFailedCount: Scalars['Int']['output'];
  concurrencyStamp?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  emailConfirmed: Scalars['Boolean']['output'];
  id: Scalars['String']['output'];
  lockoutEnabled: Scalars['Boolean']['output'];
  lockoutEnd?: Maybe<Scalars['DateTime']['output']>;
  normalizedEmail?: Maybe<Scalars['String']['output']>;
  normalizedUserName?: Maybe<Scalars['String']['output']>;
  passwordHash?: Maybe<Scalars['String']['output']>;
  passwordRestoreToken?: Maybe<Scalars['Int']['output']>;
  passwordRestoreValidUntil: Scalars['DateTime']['output'];
  phoneNumber?: Maybe<Scalars['String']['output']>;
  phoneNumberConfirmed: Scalars['Boolean']['output'];
  profilePicture?: Maybe<Array<Scalars['Byte']['output']>>;
  recipes?: Maybe<Array<Recipe>>;
  securityStamp?: Maybe<Scalars['String']['output']>;
  twoFactorEnabled: Scalars['Boolean']['output'];
  userName?: Maybe<Scalars['String']['output']>;
};

export type RegisterUserInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type RegisterUserModel = {
  __typename?: 'RegisterUserModel';
  email?: Maybe<Scalars['String']['output']>;
  userName?: Maybe<Scalars['String']['output']>;
};

export type RegisterUserPayload = {
  __typename?: 'RegisterUserPayload';
  errors: Array<IdentityError>;
  jwtToken?: Maybe<Scalars['String']['output']>;
  user?: Maybe<RegisterUserModel>;
  userProfilePicture?: Maybe<Scalars['String']['output']>;
};

export type UserRecipesModel = {
  __typename?: 'UserRecipesModel';
  commentsCount: Scalars['Int']['output'];
  cookingSteps: Scalars['String']['output'];
  cookingTime: Scalars['TimeSpan']['output'];
  difficulty: DifficultyLevels;
  id: Scalars['Int']['output'];
  ingredients: Scalars['String']['output'];
  likes: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  user: RecipeRealmServerUser;
  userId: Scalars['String']['output'];
};

export type ValidateTokenInput = {
  email: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type RegisterUserMutationVariables = Exact<{
  userInput: RegisterUserInput;
}>;


export type RegisterUserMutation = { __typename?: 'Mutation', registerUser: { __typename?: 'RegisterUserPayload', userProfilePicture?: string | null, jwtToken?: string | null, user?: { __typename?: 'RegisterUserModel', userName?: string | null, email?: string | null } | null, errors: Array<{ __typename?: 'IdentityError', code: string, description: string }> } };

export type LoginUserMutationVariables = Exact<{
  userInput: LoginUserInput;
}>;


export type LoginUserMutation = { __typename?: 'Mutation', loginUser: { __typename?: 'LoginUserPayload', userProfilePicture?: string | null, jwtToken?: string | null, user?: { __typename?: 'LoginUserModel', userName?: string | null, email?: string | null } | null, error?: { __typename?: 'IdentityError', code: string, description: string } | null } };

export type ForgotPasswordMutationVariables = Exact<{
  userInput: ForgotPasswordInput;
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: { __typename?: 'ForgotPasswordPayload', emailSent: boolean, error: string } };

export type ChangePasswordMutationVariables = Exact<{
  userInput: ChangePasswordInput;
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'ChangePasswordPayload', passwordChanged: boolean, errors: Array<{ __typename?: 'IdentityError', code: string, description: string }> } };

export type ChangePictureMutationVariables = Exact<{
  userInput: ChangeProfilePictureInput;
}>;


export type ChangePictureMutation = { __typename?: 'Mutation', changePicture: { __typename?: 'ChangeProfilePicturePayload', profilePictureChanged: boolean, errors: Array<{ __typename?: 'IdentityError', code: string, description: string }> } };

export type CheckUsernameAvailabilityQueryVariables = Exact<{
  username: Scalars['String']['input'];
}>;


export type CheckUsernameAvailabilityQuery = { __typename?: 'Query', checkUsernameAvailability: boolean };

export type CheckEmailAvailabilityQueryVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type CheckEmailAvailabilityQuery = { __typename?: 'Query', checkEmailAvailability: boolean };

export type ValidateTokenQueryVariables = Exact<{
  token: Scalars['String']['input'];
  email: Scalars['String']['input'];
}>;


export type ValidateTokenQuery = { __typename?: 'Query', validateToken: boolean };

export type UserRecipesQueryVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type UserRecipesQuery = { __typename?: 'Query', userRecipes: { __typename?: 'GetUserRecipesPayload', error: string, userRecipes: Array<{ __typename?: 'UserRecipesModel', name: string, ingredients: string, likes: number, commentsCount: number, cookingTime: any, difficulty: DifficultyLevels, cookingSteps: string, userId: string }> } };


export const RegisterUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RegisterUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RegisterUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"registerUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"userProfilePicture"}},{"kind":"Field","name":{"kind":"Name","value":"jwtToken"}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]}}]} as unknown as DocumentNode<RegisterUserMutation, RegisterUserMutationVariables>;
export const LoginUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LoginUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"loginUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"userProfilePicture"}},{"kind":"Field","name":{"kind":"Name","value":"jwtToken"}},{"kind":"Field","name":{"kind":"Name","value":"error"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]}}]} as unknown as DocumentNode<LoginUserMutation, LoginUserMutationVariables>;
export const ForgotPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ForgotPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ForgotPasswordInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"forgotPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"emailSent"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]} as unknown as DocumentNode<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const ChangePasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangePassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ChangePasswordInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changePassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"passwordChanged"}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]}}]} as unknown as DocumentNode<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const ChangePictureDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangePicture"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ChangeProfilePictureInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changePicture"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"profilePictureChanged"}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]}}]} as unknown as DocumentNode<ChangePictureMutation, ChangePictureMutationVariables>;
export const CheckUsernameAvailabilityDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CheckUsernameAvailability"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"checkUsernameAvailability"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}]}]}}]} as unknown as DocumentNode<CheckUsernameAvailabilityQuery, CheckUsernameAvailabilityQueryVariables>;
export const CheckEmailAvailabilityDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CheckEmailAvailability"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"checkEmailAvailability"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}]}]}}]} as unknown as DocumentNode<CheckEmailAvailabilityQuery, CheckEmailAvailabilityQueryVariables>;
export const ValidateTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ValidateToken"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"token"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"validateToken"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userInput"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"token"},"value":{"kind":"Variable","name":{"kind":"Name","value":"token"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}]}}]}]}}]} as unknown as DocumentNode<ValidateTokenQuery, ValidateTokenQueryVariables>;
export const UserRecipesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserRecipes"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userRecipes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userRecipes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"ingredients"}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"commentsCount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"userRecipes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"cookingTime"}},{"kind":"Field","name":{"kind":"Name","value":"difficulty"}},{"kind":"Field","name":{"kind":"Name","value":"ingredients"}},{"kind":"Field","name":{"kind":"Name","value":"cookingSteps"}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"commentsCount"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]} as unknown as DocumentNode<UserRecipesQuery, UserRecipesQueryVariables>;