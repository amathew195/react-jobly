import { useState } from 'react';
/**
 * This component renders a search form for users to filter through companies
 * or jobs.
 *
 * Props: onSearch()
 * State: none
 */

function SearchForm({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");
  console.log(searchTerm, "searchForm");


  function handleChange(evt) {
    const { value } = evt.target;
    setSearchTerm(value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onSearch(searchTerm);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Search Term"
          value={searchTerm}
          onChange={handleChange}>
        </input>
        <button type="submit">Submit</button>
      </form>
    </div>
  );

}

export default SearchForm;