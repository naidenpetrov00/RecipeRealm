/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "mutation RegisterUser($userInput: RegisterUserInput!) {\n  registerUser(userInput: $userInput) {\n    user {\n      userName\n      email\n    }\n    userProfilePicture\n    jwtToken\n    errors {\n      code\n      description\n    }\n  }\n}\n\nmutation LoginUser($userInput: LoginUserInput!) {\n  loginUser(userInput: $userInput) {\n    user {\n      userName\n      email\n    }\n    userProfilePicture\n    jwtToken\n    error {\n      code\n      description\n    }\n  }\n}\n\nmutation ForgotPassword($userInput: ForgotPasswordInput!) {\n  forgotPassword(userInput: $userInput) {\n    emailSent\n    error\n  }\n}\n\nmutation ChangePassword($userInput: ChangePasswordInput!) {\n  changePassword(userInput: $userInput) {\n    passwordChanged\n    errors {\n      code\n      description\n    }\n  }\n}\n\nmutation ChangePicture($userInput: ChangeProfilePictureInput!) {\n  changePicture(userInput: $userInput) {\n    profilePictureChanged\n    errors {\n      code\n      description\n    }\n  }\n}": types.RegisterUserDocument,
    "query CheckUsernameAvailability($username: String!) {\n  checkUsernameAvailability(username: $username)\n}\n\nquery CheckEmailAvailability($email: String!) {\n  checkEmailAvailability(email: $email)\n}\n\nquery ValidateToken($token: String!, $email: String!) {\n  validateToken(userInput: {token: $token, email: $email})\n}": types.CheckUsernameAvailabilityDocument,
    "query UserRecipes($email: String!) {\n  userRecipes(email: $email) {\n    userRecipes {\n      name\n      ingredients\n      likes\n      commentsCount\n    }\n    userRecipes {\n      name\n      cookingTime\n      difficulty\n      ingredients\n      cookingSteps\n      likes\n      commentsCount\n      userId\n    }\n    error\n  }\n}": types.UserRecipesDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation RegisterUser($userInput: RegisterUserInput!) {\n  registerUser(userInput: $userInput) {\n    user {\n      userName\n      email\n    }\n    userProfilePicture\n    jwtToken\n    errors {\n      code\n      description\n    }\n  }\n}\n\nmutation LoginUser($userInput: LoginUserInput!) {\n  loginUser(userInput: $userInput) {\n    user {\n      userName\n      email\n    }\n    userProfilePicture\n    jwtToken\n    error {\n      code\n      description\n    }\n  }\n}\n\nmutation ForgotPassword($userInput: ForgotPasswordInput!) {\n  forgotPassword(userInput: $userInput) {\n    emailSent\n    error\n  }\n}\n\nmutation ChangePassword($userInput: ChangePasswordInput!) {\n  changePassword(userInput: $userInput) {\n    passwordChanged\n    errors {\n      code\n      description\n    }\n  }\n}\n\nmutation ChangePicture($userInput: ChangeProfilePictureInput!) {\n  changePicture(userInput: $userInput) {\n    profilePictureChanged\n    errors {\n      code\n      description\n    }\n  }\n}"): (typeof documents)["mutation RegisterUser($userInput: RegisterUserInput!) {\n  registerUser(userInput: $userInput) {\n    user {\n      userName\n      email\n    }\n    userProfilePicture\n    jwtToken\n    errors {\n      code\n      description\n    }\n  }\n}\n\nmutation LoginUser($userInput: LoginUserInput!) {\n  loginUser(userInput: $userInput) {\n    user {\n      userName\n      email\n    }\n    userProfilePicture\n    jwtToken\n    error {\n      code\n      description\n    }\n  }\n}\n\nmutation ForgotPassword($userInput: ForgotPasswordInput!) {\n  forgotPassword(userInput: $userInput) {\n    emailSent\n    error\n  }\n}\n\nmutation ChangePassword($userInput: ChangePasswordInput!) {\n  changePassword(userInput: $userInput) {\n    passwordChanged\n    errors {\n      code\n      description\n    }\n  }\n}\n\nmutation ChangePicture($userInput: ChangeProfilePictureInput!) {\n  changePicture(userInput: $userInput) {\n    profilePictureChanged\n    errors {\n      code\n      description\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CheckUsernameAvailability($username: String!) {\n  checkUsernameAvailability(username: $username)\n}\n\nquery CheckEmailAvailability($email: String!) {\n  checkEmailAvailability(email: $email)\n}\n\nquery ValidateToken($token: String!, $email: String!) {\n  validateToken(userInput: {token: $token, email: $email})\n}"): (typeof documents)["query CheckUsernameAvailability($username: String!) {\n  checkUsernameAvailability(username: $username)\n}\n\nquery CheckEmailAvailability($email: String!) {\n  checkEmailAvailability(email: $email)\n}\n\nquery ValidateToken($token: String!, $email: String!) {\n  validateToken(userInput: {token: $token, email: $email})\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query UserRecipes($email: String!) {\n  userRecipes(email: $email) {\n    userRecipes {\n      name\n      ingredients\n      likes\n      commentsCount\n    }\n    userRecipes {\n      name\n      cookingTime\n      difficulty\n      ingredients\n      cookingSteps\n      likes\n      commentsCount\n      userId\n    }\n    error\n  }\n}"): (typeof documents)["query UserRecipes($email: String!) {\n  userRecipes(email: $email) {\n    userRecipes {\n      name\n      ingredients\n      likes\n      commentsCount\n    }\n    userRecipes {\n      name\n      cookingTime\n      difficulty\n      ingredients\n      cookingSteps\n      likes\n      commentsCount\n      userId\n    }\n    error\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;