import { NavLink } from "react-router-dom";

/**
 * Renders the navbar.
 *
 * Props: none
 * State: none
 *
 * App -> NavBar
 */

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white">
      <div className="container-fluid">
        <NavLink className="navbar-brand px-2" to="/">
          Jobly
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNavAltMarkup"
        >
          <div className="navbar-nav">
            <NavLink className="nav-link" reloadDocument to="/companies">
              Companies
            </NavLink>
            <NavLink className="nav-link" reloadDocument to="/jobs">
              Jobs
            </NavLink>
            {/* <NavLink className="nav-link" reloadDocument to="/">
              Logout
            </NavLink> */}
            {/* <NavLink className="nav-link" reloadDocument to="/profile">
              Profile
            </NavLink> */}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
