import { RouterProvider, createBrowserRouter } from "react-router-dom";

import HomePage from "./pages/HomePage";
import MyAccount from "./pages/MyAccount";
import ErrorPage from "./pages/ErrorPage";
import RootLayout from "./pages/RootLayout";
import LoginPage from "./pages/identity/LoginPage";
import RegisterPage from "./pages/identity/RegisterPage";
import RequireAuth from "@auth-kit/react-router/RequireAuth";
import ForgotPassword from "./pages/identity/ForgotPassword";

import "./App.css";
import MyRecipes from "./pages/MyRecipes";
import SavedRecipes from "./pages/SavedRecipes";
import AddRecipe from "./pages/AddRecipe";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "addrecipe",
        element: (
          <RequireAuth fallbackPath="/login">
            <AddRecipe />
          </RequireAuth>
        ),
      },
      {
        path: "myaccount",
        element: (
          <RequireAuth fallbackPath="/login">
            <MyAccount />
          </RequireAuth>
        ),
        children: [
          { path: "myrecipes", element: <MyRecipes /> },
          { path: "savedrecipes", element: <SavedRecipes /> },
        ],
      },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "forgot-password", element: <ForgotPassword /> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
