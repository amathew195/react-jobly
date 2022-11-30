import { useState } from 'react'

function SearchForm({onSearch}) {
  const [searchTerm, setSearchTerm] = useState("");

  function handleChange(evt) {
    const { value } = evt.target;
    setSearchTerm(value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onSearch(searchTerm);
    setSearchTerm("");
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
  )

}

export default SearchForm;