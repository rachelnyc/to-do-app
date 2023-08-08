import React from "react";

const SearchBar = ({ searchText, setSearchText }) => {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
