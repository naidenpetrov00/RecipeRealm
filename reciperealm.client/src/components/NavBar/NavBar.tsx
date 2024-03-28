import { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../customHooks/helpers";

import SearchForm from "./SearchForm";
import LogoutButon from "./LogoutButton";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { IUserLoginValues } from "../../abstractions/identity";

import styles from "./NavBar.module.css";
import defaultProfilePicture from "../../assets/vecteezy_default-avatar-profile-icon-vector-in-flat-style_27708418.jpg";

const NavBar = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.value);
  const auth = useAuthUser<IUserLoginValues>();

  return (
    <nav
      className={styles.nav + " navbar navbar-expand-lg navbar-dark bg-dark"}
    >
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
            <Fragment>
              <li>
                <NavLink to="/myaccount">
                  <img
                    src={defaultProfilePicture}
                    alt="profile picture"
                    className={"profile-pic " + styles.profilePic}
                  ></img>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/myaccount">
                  {auth?.username || "MyProfile"}
                </NavLink>
              </li>
              <li className="nav-item">
                <LogoutButon />
              </li>
            </Fragment>
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
