import JoblyApi from './api';
import JobCardList from './JobCardList';
import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import './CompanyDetail.css';
import Loading from './Loading'

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
  const [companyDetails, setCompanyDetails] = useState({ data: null, isLoading: true, err: null });
  console.log(companyDetails, "CompanyDetails");

  const { name } = useParams();

  useEffect(function getCompanyDetailsOnInitialRender() {
    async function getCompanyDetails() {
      try {
        const response = await JoblyApi.getCompany(name);
        setCompanyDetails({ data: response, isLoading: false, err: null });
      } catch (err) {
        setCompanyDetails({ data: null, isLoading: false, err });
      }
    }
    getCompanyDetails();
  }, [name]);

  if (companyDetails.isLoading){
    return <p className="CompanyDetail-loading"><Loading/></p>;
  }
  if (companyDetails.err) return <Navigate to="/companies" />;

  return (
    <div className="CompanyDetail col-md-8 offset-md-2">
      <h1>{companyDetails.data.name}</h1>
      <h6 className='CompanyDetail-desc'>{companyDetails.data.description}</h6>
      <JobCardList jobs={companyDetails.data.jobs} />
    </div>
  );
}

export default CompanyDetail;