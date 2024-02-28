import React from "react";
import ReactDOM from "react-dom/client";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";

import App from "./App.tsx";
import AuthProvider from "react-auth-kit";
import createStore from "react-auth-kit/createStore";
import { IUserLoginValues } from "./abstractions/identity.tsx";
import { Provider } from "react-redux";
import reduxStore from "./store/store.ts";

const client = new ApolloClient({
  uri: "http://localhost:5072/graphql",
  cache: new InMemoryCache(),
  name: "RecipeRealm",
  version: "0.1",
});

const authStore = createStore<IUserLoginValues>({
  authName: "_auth",
  authType: "cookie",
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === "https:",
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthProvider store={authStore}>
    <React.StrictMode>
      <ApolloProvider client={client}>
        <Provider store={reduxStore}>
          <App />
        </Provider>
      </ApolloProvider>
    </React.StrictMode>
  </AuthProvider>
);
