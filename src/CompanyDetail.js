import JoblyApi from './api';
import JobCardList from './JobCardList';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

/**
 * This component displays jobs available at a specific company.
 *
 * Props: none
 * State: companyDetails (array of objects)
 *  ex. [{ data: {description, handle, jobs, logoUrl, name, numEmployees},
 * isLoading: boolean }...]
 *
 * App -> Company Detail
 */

function CompanyDetail() {
  const [companyDetails, setCompanyDetails] = useState({ data: null, isLoading: true });

  console.log(companyDetails, "company details");

  const { name } = useParams();

  useEffect(function getCompanyDetailsOnInitialRender() {
    async function getCompanyDetails() {
      const response = await JoblyApi.getCompany(name);
      setCompanyDetails({ data: response, isLoading: false });
      console.log(response, "response");
    }
    getCompanyDetails();
  }, []);

  if (companyDetails.isLoading) return <p>Loading...</p>;

  return (
    <div>
      {companyDetails.data.jobs.map(job => (
        <JobCardList key={uuidv4()} job={job} />
      ))}
    </div>
  );
}

export default CompanyDetail;