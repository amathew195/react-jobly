import JoblyApi from "./api";
import { useEffect, useState } from 'react';
import CompanyCard from "./CompanyCard";
import SearchForm from "./SearchForm";

/**
 * Company list renders a list of companies with a search form to search for
 * a company by name.
 *
 * Props: none
 * State: companiesList (array of objects)
 *  ex. [{ data: [{description, handle,logoUrl, name, numEmployees}....], isLoading: boolean }...]
 *
 * Company List -> Company Card, SearchForm
 *
 */

function CompanyList() {
  const [companiesList, setCompaniesList] = useState({ data: null, isLoading: true });
  const [searchTerm, setSearchTerm] = useState("");
  console.log("company list", companiesList);
  console.log("search term", searchTerm);

  useEffect(function uploadCompaniesOnInitialRender() {
    async function uploadCompaniesData() {
      const response = await JoblyApi.getCompanies();
      setCompaniesList({ data: response, isLoading: false });
    }

    uploadCompaniesData();
  }, []);

  function updateSearchTerm(term) {
    setSearchTerm(term);
  }

  useEffect(function uploadCompaniesOnSearch() {
    async function uploadCompaniesData() {
      setCompaniesList({ data: [], isLoading: true });
      let companies;
      if (searchTerm === "") {
        companies = await JoblyApi.getCompanies();
      } else {
        companies = await JoblyApi.getCompanies({ nameLike: searchTerm });
      }
      setCompaniesList({ data: companies, isLoading: false });
    }
    uploadCompaniesData();
  }, [searchTerm]);


  if (companiesList.isLoading) return <p>Loading...</p>;

  return (
    <div>
      <SearchForm onSearch={updateSearchTerm} />
      {searchTerm && <p>Searching for: {searchTerm}</p>}
      {companiesList.data.map(c => (
        <CompanyCard key={c.handle} company={c} />
      ))}
    </div>
  );
}

export default CompanyList;