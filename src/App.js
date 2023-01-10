import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import RoutesList from "./RoutesList";
import NavBar from "./NavBar";
import userContext from "./userContext";
import JoblyApi from "./api";
import jwt_decode from "jwt-decode";
import Loading from "./Loading";

const initialUser = { userDetails: null, isLoading: true, err: null };

/**
 * This app component displays a website that allows users to navigate through
 * companies and job listings.
 *
 * If an error is encountered, it will display an error page.
 *
 * Props - none
 * State:
 * - loggedInStatus: true, false, null
 * - currentUser: {userDetails: {applications, email, firstName, isAdmin,
 * lastName, username} isLoading: {boolean}}
 *
 * App -> NavBar, RoutesList, UserContext.Provider
 */

function App() {
  const [currentUser, setCurrentUser] = useState(initialUser);
  const [loggedInStatus, setLoggedInStatus] = useState(null);
  console.log(currentUser, "currentUser in App");

  useEffect(() => {
    async function updateUserDetails() {
      const localToken = localStorage.getItem("token");
      if (localToken) {
        await updateUser(localToken);
      } else {
        setLoggedInStatus(false);
      }
    };
    updateUserDetails();
  }, []);

  /**
   * This function accepts a token. The token is decoded to extract the
   * username information. The function uses the username and token to
   * update user details. If the update is unsuccessful, it will log an
   * error.
   */

  async function updateUser(token) {
    const decodedToken = jwt_decode(token);
    const { username } = decodedToken;
    try {
      const user = await JoblyApi.getUserDetails(username, token);
      setCurrentUser({ userDetails: user, isLoading: false, err: null });
      setLoggedInStatus(true);
    } catch (err) {
      console.error(err);
      setCurrentUser({ userDetails: null, isLoading: false, err });
      setLoggedInStatus(false);
    }
  }

  /**
   * loginUser accepts a username and password. It authenticates the
   * username and password and if successful, returns a token (string)
   * and updates currentUser state.
   */
  async function loginUser({ username, password }) {
    const token = await JoblyApi.authenticateLoginAndGetToken({
      username,
      password,
    });
    localStorage.setItem("token", token);
    await updateUser(token);
  }

  /**
   * signUpUser accepts a username, password, firstName, lastName, and email.
   * It validates the signup information and  and if successful,
   * returns a token (string) and updates currentUser state.
   */
  async function signUpUser({
    username,
    password,
    firstName,
    lastName,
    email,
  }) {
    const token = await JoblyApi.authenticateSignUpAndGetToken({
      username,
      password,
      firstName,
      lastName,
      email,
    });
    localStorage.setItem("token", token);
    await updateUser(token);
  }

  /**
   * logoutUser allows the user to logout from their account. It resets the
   * setToken and setCurrentUser states to the initial value/null.
   *
   * It accepts nothing and returns nothing.
   */
  function logoutUser() {
    setLoggedInStatus(false);
    localStorage.clear();
    setCurrentUser(initialUser);
  }

  /** Accepts form data as an object
   * { username, firstName, lastName, email }
   *
   * Updates current user state with new user details.
   *
   */
  async function editUser({ username, firstName, lastName, email }) {
    const token = localStorage.getItem("token");
    const user = await JoblyApi.editProfileAndGetUserDetails(
      username,
      {
        firstName,
        lastName,
        email,
      },
      token
    );
    setCurrentUser({ userDetails: user, isLoading: false, err: null });
  }

  async function applyForJob(username, jobId) {
    const token = localStorage.getItem("token");
    const applicationStatus = await JoblyApi.updateUserAndApplyToJob(
      username,
      jobId,
      token
    );
    await updateUser(token);
  }

  async function unapplyForJob(username, jobId) {
    const token = localStorage.getItem("token");
    const applicationStatus = await JoblyApi.updateUserAndUnapplyToJob(
      username,
      jobId,
      token
    );
    await updateUser(token);
  }

  if (currentUser.err) {
    return <p className="App App-err">Error: Please try again later.</p>;
  }

  if (loggedInStatus === null){
    return <div><Loading/></div>
  }

  return (
    <userContext.Provider
      value={{ userDetails: currentUser.userDetails, loggedInStatus }}
    >
      <div className="App container-fluid">
        <BrowserRouter>
          <NavBar logout={logoutUser} />
          <RoutesList
            login={loginUser}
            signUp={signUpUser}
            editUser={editUser}
            applyForJob={applyForJob}
            unapplyForJob={unapplyForJob}
          />
        </BrowserRouter>
      </div>
    </userContext.Provider>
  );
}

export default App;
