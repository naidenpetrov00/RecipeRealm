import React from "react";
import ReactDOM from "react-dom/client";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";

import App from "./App.tsx";

const client = new ApolloClient({
  uri: "http://localhost:5072/graphql",
  cache: new InMemoryCache(),
  name: "RecipeRealm",
  version: "0.1",
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
