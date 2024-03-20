import { RouterProvider, createBrowserRouter } from "react-router-dom";

import HomePage from "./pages/HomePage";
import MyAccount from "./pages/MyAccount";
import ErrorPage from "./pages/ErrorPage";
import RootLayout from "./pages/RootLayout";
import LoginPage from "./pages/identity/LoginPage";
import RegisterPage from "./pages/identity/RegisterPage";
import RequireAuth from "@auth-kit/react-router/RequireAuth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "myaccount",
        element: (
          <RequireAuth fallbackPath="/login">
            <MyAccount />
          </RequireAuth>
        ),
      },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
