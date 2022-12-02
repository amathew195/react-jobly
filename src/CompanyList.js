import JoblyApi from "./api";
import { useEffect, useState } from "react";
import CompanyCard from "./CompanyCard";
import SearchForm from "./SearchForm";
import "./CompanyList.css";

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
  const [companiesList, setCompaniesList] = useState({
    data: null,
    isLoading: true,
    err: null
  });
  const [searchTerm, setSearchTerm] = useState("");
  console.log("company list", companiesList);
  console.log("search term", searchTerm);

  useEffect(function uploadCompaniesOnInitialRender() {
    async function uploadCompaniesData() {
      const response = await JoblyApi.getCompanies();
      setCompaniesList({ data: response, isLoading: false, err: null });
    }
    uploadCompaniesData();
  }, []);

  function updateSearchTerm(term) {
    setSearchTerm(term);
  }

  useEffect(
    function uploadCompaniesOnSearch() {
      async function uploadCompaniesData() {
        setCompaniesList({ data: [], isLoading: true });
        try {
          let companies;
          if (searchTerm === "") {
            companies = await JoblyApi.getCompanies();
          } else {
            companies = await JoblyApi.getCompanies({ nameLike: searchTerm });
          }
          setCompaniesList({ data: companies, isLoading: false, err: null });
        } catch (err) {
          setCompaniesList({ data: null, isLoading: false, err });
        }
      }
      uploadCompaniesData();
    },
    [searchTerm]
  );

  if (companiesList.isLoading) {
    return (
      <div className="CompanyList-loading">
        <p>Loading...</p>
      </div>
    );
  }

  if (companiesList.err) {
    return (
      <div>{companiesList.err}</div>
    );
  }

  return (
    <div className="CompanyList col-md-8 offset-md-2">
      <SearchForm onSearch={updateSearchTerm} />
      {searchTerm && (
        <p className="CompanyList-search">Searching for: {searchTerm}</p>
      )}
      {companiesList.data.map((c) => (
        <CompanyCard key={c.handle} company={c} />
      ))}
    </div>
  );
}

export default CompanyList;
