import JobCard from "./JobCard";
/**
 * This component renders details about a specific job.
 *
 * Props: jobs (array of objects)
 *  Example: [{companyHandle, companyName, equity, id, salary, title}...]
 *
 * State: none
 *
 * JobList -> JobCardList
 * CompanyDetail -> JobCardList
 */

function JobCardList({ jobs, applyForJob, unapplyForJob }) {
  return (
    <div>
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
          applyForJob={applyForJob}
          unapplyForJob={unapplyForJob}
        />
      ))}
    </div>
  );
}

export default JobCardList;
