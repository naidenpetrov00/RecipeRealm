import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";

import { authenticated } from "../store/authSlice";
import NavBar from "../components/NavBar/NavBar";
import { useAppDispatch } from "../customHooks/helpers";

const RootLayout = () => {
  const isAuthCookie = useIsAuthenticated();
  const dispatch = useAppDispatch();
  dispatch(authenticated(isAuthCookie()));
  return (
    <Fragment>
      <NavBar />
      <main>
        <Outlet />
      </main>
    </Fragment>
  );
};

export default RootLayout;
