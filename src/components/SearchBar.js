import React, { useState } from "react";
function SearchBar({ placeholder, data }) {
  const [filteredData, setFilteredData] = useState([]);
  const handleFilter = (event) => {
    const searchWord = event.target.value;
    const newFilter = data.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });
    setFilteredData(newFilter);
  };
  return (
    <div className="search">
      <div className="searchInputs">
        <input type="text" placeholder={placeholder} onChange={handleFilter} />
      </div>
      {filteredData.length !== 0 && (
        <div className="dataResult">
          {filteredData.map((value, key) => {
            return <div>{value.name}</div>;
          })}
        </div>
      )}
    </div>
  );
}
export default SearchBar;
