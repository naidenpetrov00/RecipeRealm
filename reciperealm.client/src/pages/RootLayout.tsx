import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import { Fragment } from "react";

const RootLayout = () => {
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
