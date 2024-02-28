import { NavLink } from "react-router-dom";

import SearchForm from "./SearchForm";
import LogoutButon from "./LogoutButton";
import { Fragment, useEffect, useState } from "react";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import { useSelector } from "react-redux";

const NavBar = () => {
  const isAuthenticated = useSelector((state) => state.auth.value);
  console.log(isAuthenticated);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <NavLink className="navbar-brand" to="/">
        RecipeRealm
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink className="nav-link" to="/">
              Home <span className="sr-only">(current)</span>
            </NavLink>
          </li>
          {isAuthenticated ? (
            <li className="nav-item">
              <LogoutButon />
            </li>
          ) : (
            <Fragment>
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">
                  Sign In
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/register">
                  Register
                </NavLink>
              </li>
            </Fragment>
          )}
        </ul>
        <SearchForm />
      </div>
    </nav>
  );
};

export default NavBar;
