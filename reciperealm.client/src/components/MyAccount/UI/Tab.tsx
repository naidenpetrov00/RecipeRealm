import { NavLink, Outlet } from "react-router-dom";

const Tab = () => {
  return (
    <section>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink className="nav-link" to="myrecipes">
              My Recipes
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="savedrecipes">
              Saved Recipes
            </NavLink>
          </li>
        </ul>
      </nav>
      <Outlet />
    </section>
  );
};

export default Tab;
