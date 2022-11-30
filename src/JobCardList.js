/**
 * This component renders details about a specific job.
 *
 * Props: job (object)
 *  Example: {companyHandle, companyName, equity, id, salary, title}
 *
 * State: none
 *
 * JobList -> JobCardList
 * CompanyDetail -> JobCardList
 */

function JobCardList({ job }) {

  return (
    <div>
      <div>{job.title}</div>
      <div>Salary: {job.salary}</div>
      <div>Equity: {job.equity}</div>
    </div>
  );
}

export default JobCardList;