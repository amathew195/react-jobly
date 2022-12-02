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
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/companies" element={<CompanyList />} />
      <Route path="/companies/:name" element={<CompanyDetail />} />
      <Route path="/jobs" element={<JobList />} />
      <Route path="/profile" element={<ProfileForm />} />
      <Route path="/signup" element={<SignUpForm signUp={signUp} />} />
      <Route path="/login" element={<LoginForm login={login} />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default RoutesList;
