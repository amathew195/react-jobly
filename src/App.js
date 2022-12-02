import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import RoutesList from "./RoutesList";
import NavBar from "./NavBar";
import userContext from "./userContext";
import JoblyApi from "./api";
import jwt_decode from "jwt-decode";

/**
 * This app component displays a website that allows users to navigate through
 * companies and job listings.
 *
 * Props - none
 * State:
 * - token: string
 * //TODO: more specific details
 * - currentUser: {userDetails}
 *
 * App -> NavBar, RoutesList, UserContext.Provider
 */

function App() {
  // isLoading
  let initialUser = { userDetails: null };

  const [token, setToken] = useState();
  const [currentUser, setCurrentUser] = useState(initialUser);

  console.log(currentUser, "currentUser");
  console.log(token, "token");

  useEffect(
    function updateUserDataWhenTokenChanges() {
      if (token) {
        const decodedToken = jwt_decode(token);
        const { username } = decodedToken;
        async function updateUser() {
          //TODO: try catch, display friendly error to user
          const user = await JoblyApi.getUserDetails(username);
          setCurrentUser({ userDetails: user });
        }
        updateUser();
      }
    },
    [token]
  );

  //TODO: docstring
  async function loginUser({ username, password }) {
    const token = await JoblyApi.authenticateLoginAndGetToken({
      username,
      password,
    });
    setToken(token);
  }

  //TODO: docstring
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
    setToken(token);
  }

  //TODO: docstring
  function logoutUser() {
    setToken(null);
    setCurrentUser(initialUser);
  }

  return (
    <userContext.Provider
      value={{ currentUser: currentUser.userDetails, token }}
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
