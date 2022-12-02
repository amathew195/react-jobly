import "./Homepage.css";
import userContext from "./userContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
/**
 * This component renders the homepage.
 *
 * Props: none
 * State: none
 *
 * Context:
 * userDetails -
 * {
 * data: {applications, email, firstName, lastName, isAdmin, username},
 * isLoading,
 * err
 * }
 * isLoggedIn - boolean
 *
 * RoutesList -> Homepage
 */

function Homepage() {
  const { userDetails, isLoggedIn } = useContext(userContext);

  return (
    <div className="Homepage">
      <div>
        <h1>Jobly</h1>
        <h2>All the jobs in one, convenient place.</h2>
        {isLoggedIn ? <h2>Welcome Back, {userDetails.firstName}!</h2> :
          <div className="Homepage-btns">
            <Link className="btn btn-primary" to="/login">Login</Link>
            <Link className="btn btn-primary" to="/signup">Sign up</Link>
          </div>}
      </div>
    </div>
  );
}

export default Homepage;
