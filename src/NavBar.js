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
      <NavLink to="/companies">Companies</NavLink>
      <NavLink to="/jobs">Jobs</NavLink>
    </nav>
  );
}

export default NavBar;