import JoblyApi from "./api";
import { useEffect, useState } from "react";
import JobCardList from "./JobCardList";
import SearchForm from "./SearchForm";
import "./JobList.css";

/**
 * This component displays a list of all available jobs.
 *
 * Props: none
 * State: jobsList (array of objects)
 *  ex. [{ data: [{companyHandle, companyName, equity, id, salary, title}...],
 * isLoading: boolean }...]
 *
 * RoutesList -> JobList -> SearchForm, JobCardList
 */

function JobList({ applyForJob }) {
  const [jobsList, setJobsList] = useState({ data: null, isLoading: true });
  const [searchTerm, setSearchTerm] = useState("");
  console.log("Jobs List", jobsList);
  console.log("search term", searchTerm);

  useEffect(function uploadJobsOnInitialRender() {
    async function uploadJobsData() {
      const response = await JoblyApi.getJobs();
      setJobsList({ data: response, isLoading: false });
    }
    uploadJobsData();
  }, []);

  function updateSearchTerm(term) {
    setSearchTerm(term);
  }

  useEffect(
    function uploadJobsOnSearch() {
      async function uploadJobsData() {
        setJobsList({ data: [], isLoading: true });
        let jobs;
        if (searchTerm === "") {
          jobs = await JoblyApi.getJobs();
        } else {
          jobs = await JoblyApi.getJobs({ title: searchTerm });
        }
        setJobsList({ data: jobs, isLoading: false });
      }
      uploadJobsData();
    },
    [searchTerm]
  );

  if (jobsList.isLoading) {
    return (
      <div className="JobList-loading">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="JobList col-md-8 offset-md-2">
      <SearchForm onSearch={updateSearchTerm} />
      {searchTerm && (
        <p className="JobList-search">Searching for: {searchTerm}</p>
      )}
      <JobCardList jobs={jobsList.data} applyForJob={applyForJob} />
    </div>
  );
}

export default JobList;
