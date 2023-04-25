function SearchBar({ searchTerm, setSearchTerm, onSearch }) {
    const handleSearch = (event) => {
      setSearchTerm(event.target.value);
      onSearch(event.target.value);
    };
  
    return (
      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by description"
        />
      </div>
    );
  }

  export default SearchBar;