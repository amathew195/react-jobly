import "./Homepage.css";
import userContext from "./userContext";
import { useContext } from "react";
/**
 * This component renders the homepage.
 *
 * Props: none
 * State: none
 *
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
        {currentUser && <h2>Welcome Back, {currentUser.firstName}!</h2>}
      </div>
    </div>
  );
}

export default Homepage;
