import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import AuthProvider from "react-auth-kit";
import createStore from "react-auth-kit/createStore";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import App from "./App.tsx";
import { store as reduxStore } from "./store/store.ts";
import {
  IUserLoginValues,
  IUserLoginValuesWithPicture,
} from "./abstractions/identity.tsx";

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
