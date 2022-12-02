import { NavLink } from "react-router-dom";
import userContext from "./userContext";
import { useContext } from "react";

/**
 * Renders the navbar.
 * TODO: update
 * Props: none
 * State: none
 *
 * App -> NavBar
 */
//TODO: reloadDocuments
function NavBar({ logout }) {
  const { currentUser } = useContext(userContext);
  console.log(currentUser, "currentUser in NavBar");

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

            {!currentUser && (
              <div>
                <NavLink className="nav-link" to="/signup">
                  Signup
                </NavLink>
                <NavLink className="nav-link" to="/login">
                  Login
                </NavLink>
              </div>
            )}

            {currentUser && (
              <div>
                <NavLink onClick={logout} className="nav-link" to="/">
                  Logout {currentUser.firstName}
                </NavLink>
                <NavLink className="nav-link" to="/profile">
                  Profile
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
