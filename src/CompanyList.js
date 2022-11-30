import JoblyApi from "./api";
import { useEffect, useState } from 'react';
import CompanyCard from "./CompanyCard";
import { v4 as uuidv4 } from 'uuid';
import SearchForm from "./SearchForm";

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
  // const [searchValue, setSearchValue] = useState("");

  console.log("CompanyList", companiesList);
  // console.log("searchValue", searchValue);

  useEffect(function getCompaniesOnInitialRender() {
    console.log("getting CompaniesList")

    async function getCompaniesData() {
      const response = await JoblyApi.getCompanies();
      setCompaniesList({ data: response, isLoading: false });
    }

    getCompaniesData();
  }, []);

  async function getFilteredList(term) {
    const response = await JoblyApi.getCompanies({nameLike: term});
    setCompaniesList({ data: response, isLoading: false });
  }

  if (companiesList.isLoading) return <p>Loading...</p>;

  return (
    <div>
      <SearchForm onSearch={getFilteredList} />
      {companiesList.data.map(c => (
        <CompanyCard key={uuidv4()} company={c} />
      ))}
    </div>
  );
}

export default CompanyList;