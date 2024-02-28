import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { IUserLoginValues } from "./abstractions/identity";
import RootLayout from "./pages/RootLayout";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import createStore from "react-auth-kit/createStore";
import AuthProvider from "react-auth-kit/AuthProvider";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
