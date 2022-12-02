import { Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./Homepage";
import CompanyList from "./CompanyList";
import CompanyDetail from "./CompanyDetail";
import JobList from "./JobList";
import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";
import ProfileForm from "./ProfileForm";

/**
 * Renders the following routes:
 * /
 * /companies
 * /companies/:name
 * /jobs
 * /*
 *
 * Props: login, signUp (functions)
 * State: none
 *
 * App-> RoutesList
 */

function RoutesList({ login, signUp }) {

  const token = localStorage.getItem('token');

  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/companies" element={token ? (<CompanyList />) : (<Navigate to="/" />)} />
      <Route path="/companies/:name" element={token ? (<CompanyDetail />) : (<Navigate to="/" />)} />
      <Route path="/jobs" element={token ? (<JobList />) : (<Navigate to="/" />)} />
      <Route path="/profile" element={token ? (<ProfileForm />) : (<Navigate to="/" />)} />
      <Route path="/signup" element={token ? (<Navigate to="/" />) : (<SignUpForm signUp={signUp} />)} />
      <Route path="/login" element={token ? (<Navigate to="/" />) : (<LoginForm login={login} />)} />
      {/* <Route path="/companies/*" element={<Navigate to="/" />} /> */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default RoutesList;
