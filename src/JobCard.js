import "./JobCard.css";
import userContext from "./userContext";
import { useContext } from "react";

/**
 * Job card renders and individual job's details.
 *
 * Props: job (object)
 *  ex. {companyHandle, companyName, equity, id, salary, title}
 *
 * State: none
 *
 * JobCardList -> JobCard
 */
function JobCard({ job, applyForJob, unapplyForJob }) {
  const { userDetails } = useContext(userContext);
  return (
    <div className="JobCard card">
      <div className="card-body">
        <h6>{job.title}</h6>
        <p>
          <small>{job.companyName}</small>
        </p>
        <p>
          <small>Salary: {job.salary}</small>
        </p>
        <p>
          <small>Equity: {job.equity}</small>
        </p>
        {userDetails.applications.includes(job.id) ? (
          <button
            className="btn btn-primary"
            onClick={() => unapplyForJob(userDetails.username, job.id)}
          >
            Unapply
          </button>
        ) : (
          <button
            className="btn btn-primary"
            onClick={() => applyForJob(userDetails.username, job.id)}
          >
            Apply
          </button>
        )}
      </div>
    </div>
  );
}

export default JobCard;
