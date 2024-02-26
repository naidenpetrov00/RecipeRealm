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
    "mutation RegisterUser($input: RegisterUserInput!) {\n  registerUser(input: $input) {\n    user {\n      userName\n      email\n    }\n    jwtToken\n    errors {\n      code\n      description\n    }\n  }\n}\n\nmutation LoginUser($input: LoginUserInput!) {\n  loginUser(userInput: $input) {\n    user {\n      userName\n      email\n    }\n    jwtToken\n    error {\n      code\n      description\n    }\n  }\n}": types.RegisterUserDocument,
    "query CheckUsernameAvailability($username: String!) {\n  checkUsernameAvailability(username: $username)\n}\n\nquery CheckEmailAvailability($email: String!) {\n  checkEmailAvailability(email: $email)\n}": types.CheckUsernameAvailabilityDocument,
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
export function graphql(source: "mutation RegisterUser($input: RegisterUserInput!) {\n  registerUser(input: $input) {\n    user {\n      userName\n      email\n    }\n    jwtToken\n    errors {\n      code\n      description\n    }\n  }\n}\n\nmutation LoginUser($input: LoginUserInput!) {\n  loginUser(userInput: $input) {\n    user {\n      userName\n      email\n    }\n    jwtToken\n    error {\n      code\n      description\n    }\n  }\n}"): (typeof documents)["mutation RegisterUser($input: RegisterUserInput!) {\n  registerUser(input: $input) {\n    user {\n      userName\n      email\n    }\n    jwtToken\n    errors {\n      code\n      description\n    }\n  }\n}\n\nmutation LoginUser($input: LoginUserInput!) {\n  loginUser(userInput: $input) {\n    user {\n      userName\n      email\n    }\n    jwtToken\n    error {\n      code\n      description\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CheckUsernameAvailability($username: String!) {\n  checkUsernameAvailability(username: $username)\n}\n\nquery CheckEmailAvailability($email: String!) {\n  checkEmailAvailability(email: $email)\n}"): (typeof documents)["query CheckUsernameAvailability($username: String!) {\n  checkUsernameAvailability(username: $username)\n}\n\nquery CheckEmailAvailability($email: String!) {\n  checkEmailAvailability(email: $email)\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;