import JoblyApi from './api'
import { useEffect, useState } from 'react';

function CompanyDetail() {
  const [companyDetails, setCompanyDetails] = useState({ data: null, isLoading: true });

  useEffect(function getCompanyDetailsOnInitialRender() {
    async function getCompanyDetails() {
      const response = await JoblyApi.getCompany();
      setCompanyDetails({ data: response.data, isLoading: false });
    }
    getCompanyDetails();
  }, []);

  if (companyDetails.isLoading) return <p>Loading...</p>;

  return (
    <div>
      {companyDetails}
    </div>
  );
}

export default CompanyDetail;