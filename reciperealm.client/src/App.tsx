import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { IUserLoginValues } from "./interfaces/identity";
import RootLayout from "./pages/RootLayout";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import createStore from "react-auth-kit/createStore";
import AuthProvider from "react-auth-kit/AuthProvider";
import { logoutAction } from "./pages/Logout";

const store = createStore<IUserLoginValues>({
  authName: "_auth",
  authType: "cookie",
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === "https:",
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "logout", action: logoutAction },
    ],
  },
]);

const App = () => {
  return (
    <AuthProvider store={store}>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
