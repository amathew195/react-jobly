import "./Homepage.css";
import userContext from "./userContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
/**
 * This component renders the homepage.
 *
 * Props: none
 * State: none
 * TODO://DOES CONTEXT COUNT AS STATE?
 * RoutesList -> Homepage
 */

function Homepage() {
  const { currentUser } = useContext(userContext);
  //TODO: Login/Signup if no currentUser


  return (
    <div className="Homepage">
      <div>
        <h1>Jobly</h1>
        <h2>All the jobs in one, convenient place.</h2>
        {currentUser ? <h2>Welcome Back, {currentUser.firstName}!</h2> :
          <div className="Homepage-btns">
            <Link className="btn btn-primary" to="/login">Login</Link>
            <Link className="btn btn-primary" to="/signup">Sign up</Link>
          </div>}
      </div>
    </div>
  );
}

export default Homepage;
