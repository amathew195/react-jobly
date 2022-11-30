
import JoblyApi from "./api";
import { useEffect, useState } from 'react';
import JobCardList from "./JobCardList";
import { v4 as uuidv4 } from 'uuid';
import SearchForm from "./SearchForm";

/**
 * This component displays a list of all available jobs.
 *
 * Props: none
 * State: jobsList (array of objects)
 *  ex. [{ data: [{companyHandle, companyName, equity, id, salary, title}...],
 * isLoading: boolean }...]
 *
 * RoutesList -> JobList
 */

function JobList() {

  const [jobsList, setJobsList] = useState({ data: null, isLoading: true });
  console.log("JobsList", jobsList);

  useEffect(function getJobsOnInitialRender() {
    async function getJobsData() {
      const response = await JoblyApi.getJobs();
      setJobsList({ data: response, isLoading: false });
    }
    getJobsData();
  }, []);

  async function getFilteredList(term) {
    const response = await JoblyApi.getJobs({title: term});
    setJobsList({ data: response, isLoading: false });
  }

  if (jobsList.isLoading) return <p>Loading...</p>;

  return (
    <div>
      <SearchForm onSearch={getFilteredList} />
      {jobsList.data.map(job => (
        <JobCardList key={uuidv4()} job={job} />
      ))}
    </div>
  );
}

export default JobList;