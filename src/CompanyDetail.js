import JoblyApi from './api';
import JobCardList from './JobCardList';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

/**
 * This component displays jobs available at a specific company.
 *
 * Props: none
 * State: companyDetails (array of objects)
 *  ex. [{ data: {description, handle, jobs, logoUrl, name, numEmployees},
 * isLoading: boolean }...]
 *
 * RoutesList -> Company Detail -> JobCardList
 */

function CompanyDetail() {
  const [companyDetails, setCompanyDetails] = useState({ data: null, isLoading: true });
  console.log(companyDetails, "CompanyDetails");

  const { name } = useParams();

  useEffect(function getCompanyDetailsOnInitialRender() {
    async function getCompanyDetails() {
      const response = await JoblyApi.getCompany(name);
      setCompanyDetails({ data: response, isLoading: false });
    }
    getCompanyDetails();
  }, [name]);

  if (companyDetails.isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h1>{companyDetails.data.name}</h1>
      <p>{companyDetails.data.description}</p>
      <JobCardList jobs={companyDetails.data.jobs} />
    </div>
  );
}

export default CompanyDetail;