import { useState } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import RoutesList from "./RoutesList";
import NavBar from "./NavBar";
import userContext from "./userContext";
import JoblyApi from "./api";

/**
 * This app component displays a website that allows users to navigate through
 * companies and job listings.
 *
 * Props - none
 * State - none
 *
 * App -> NavBar, RoutesList
 */

function App() {
  let initialUser = { token: null, user: null, isLoading: true };
  const [user, setUser] = useState(initialUser);

  async function loginUser({ username, password }) {
    const token = await JoblyApi.authenticateLoginAndGetToken({
      username,
      password,
    });
    const user = await JoblyApi.getUserDetails();
    setUser({ token, user, isLoading: false });
  }

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
    const user = await JoblyApi.getUserDetails();
    setUser({ token, user, isLoading: false });
  }

  //TODO: profile
  async function

  return (
    <userContext.Provider value={user}>
      <div className="App container-fluid">
        <BrowserRouter>
          <NavBar />
          <RoutesList login={loginUser} signUp={signUpUser} />
        </BrowserRouter>
      </div>
    </userContext.Provider>
  );
}

export default App;
