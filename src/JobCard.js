import './JobCard.css';
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
function JobCard({ job }) {

  return (
    <div className="JobCard card">
      <div className="card-body">
        <h6>{job.title}</h6>
        <p><small>{job.companyName}</small></p>
        <p><small>Salary: {job.salary}</small></p>
        <p><small>Equity: {job.equity}</small></p>
      </div>
    </div>
  );
}

export default JobCard;