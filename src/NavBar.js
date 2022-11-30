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
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink reloadDocument to="/companies">Companies</NavLink>
      <NavLink reloadDocument to="/jobs">Jobs</NavLink>
    </nav>
  );
}

export default NavBar;