import { Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./Homepage";
import CompanyList from "./CompanyList";
import CompanyDetail from "./CompanyDetail";
import JobList from "./JobList";
import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";
import ProfileForm from "./ProfileForm";
import userContext from "./userContext";
import { useContext } from "react";

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

function RoutesList({ login, signUp, editUser, applyForJob, unapplyForJob }) {
  const { loggedInStatus } = useContext(userContext);
  console.log("loggedInStatus in RoutesList", loggedInStatus);
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      {loggedInStatus && (
        <>
          <Route path="/companies" element={<CompanyList />} />
          <Route path="/companies/:name" element={<CompanyDetail />} />
          <Route
            path="/jobs"
            element={
              <JobList
                applyForJob={applyForJob}
                unapplyForJob={unapplyForJob}
              />
            }
          />
          <Route
            path="/profile"
            element={<ProfileForm editUser={editUser} />}
          />
        </>
      )}
      {!loggedInStatus && (
        <>
          <Route path="/signup" element={<SignUpForm signUp={signUp} />} />
          <Route path="/login" element={<LoginForm login={login} />} />
        </>
      )}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default RoutesList;
