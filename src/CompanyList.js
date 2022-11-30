import JoblyApi from "./api";
import { useEffect, useState } from 'react';
import CompanyCard from "./CompanyCard";
import { v4 as uuidv4 } from 'uuid';

/**
 * Company list renders a list of companies.
 *
 * Props: none
 * State: companiesList (array of objects)
 *  ex. [{ data: [{description, handle,logoUrl, name, numEmployees}....], isLoading: boolean }...]
 *
 * Company List -> Company Card
 */

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
      {companiesList.data.map(c => (
        <CompanyCard key={uuidv4()} company={c} />
      ))}
    </div>
  );
}

export default CompanyList;