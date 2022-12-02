import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import RoutesList from "./RoutesList";
import NavBar from "./NavBar";
import userContext from "./userContext";
import JoblyApi from "./api";
import jwt_decode from "jwt-decode";

const initialUser = { userDetails: null, isLoading: true, err: null };

/**
 * This app component displays a website that allows users to navigate through
 * companies and job listings.
 *
 * If an error is encountered, it will display an error page.
 *
 * Props - none
 * State:
 * - token: string
 * - currentUser: {userDetails: {applications, email, firstName, isAdmin,
 * lastName, username} isLoading: {boolean}}
 *
 * App -> NavBar, RoutesList, UserContext.Provider
 */

function App() {

  const [currentUser, setCurrentUser] = useState(initialUser);
  console.log(currentUser, "currentUser");

  const isLoggedIn = currentUser.userDetails ? true : false;

  useEffect(() => {
    const localToken = localStorage.getItem('token');
    if (localToken) {
      updateUser(localToken);
    }
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
    } catch (err) {
      console.error(err);
      setCurrentUser({ userDetails: null, isLoading: false, err });
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
    localStorage.setItem('token', token);
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
    localStorage.setItem('token', token);
    await updateUser(token);
  }

  /**
   * logoutUser allows the user to logout from their account. It resets the
   * setToken and setCurrentUser states to the initial value/null.
   *
   * It accepts nothing and returns nothing.
   */
  function logoutUser() {
    localStorage.clear();
    setCurrentUser(initialUser);
  }

  if (currentUser.err) {
    return <p className="App App-err">Error: Please try again later.</p>;
  }

  return (
    <userContext.Provider
      value={{ userDetails: currentUser.userDetails, isLoggedIn }}
    >
      <div className="App container-fluid">
        <BrowserRouter>
          <NavBar logout={logoutUser} />
          <RoutesList login={loginUser} signUp={signUpUser} />
        </BrowserRouter>
      </div>
    </userContext.Provider>
  );
}

export default App;
