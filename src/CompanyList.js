import JoblyApi from "./api";
import { useEffect, useState } from 'react';
import CompanyCard from "./CompanyCard";

function CompanyList() {
  const [companiesList, setCompaniesList] = useState({ data: null, isLoading: true });
  console.log("CompanyList", companiesList);

  useEffect(function getCompaniesOnInitialRender() {
    async function getCompaniesData() {
      const response = await JoblyApi.getCompanies();
      setCompaniesList({ data: response, isLoading: false });
    }
    getCompaniesData();
  }, []);

  if (companiesList.isLoading) return <p>Loading...</p>;

  return (
    <div>
      {companiesList.data.map((c, index) => (
        <CompanyCard key={index} company={c}/>
      ))}
    </div>
  );
}

export default CompanyList;