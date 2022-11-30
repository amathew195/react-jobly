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
    <div className="JobCard">
      <h2>{job.title}</h2>
      <h3>{job.companyName}</h3>
      <p>Salary: {job.salary}</p>
      <p>Equity: {job.equity}</p>
    </div>
  );
}

export default JobCard;