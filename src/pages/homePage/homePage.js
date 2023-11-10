import React, { useState } from 'react';
import SearchBar from '../../components/searchBar/searchBar';
import FilterBar from '../../components/filterBar/filterBar';
import CharacterGrid from '../../components/characterGrid/characterGrid';

import './homePage.css';

const HomePage = () => {
  const [appliedFilters, setAppliedFilters] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  const handleApplyFilter = (filters) => {
    setAppliedFilters(filters);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setAppliedFilters({}); 
  };

  return (
    <div className="home-page">
      <div className="top-card">
        <SearchBar onSearch={handleSearch} />
        <FilterBar onApplyFilter={handleApplyFilter} />
      </div>
      <div className="bottom-card">
        <div className="left-part">
         
          {Object.entries(appliedFilters).map(([filter, value]) => (
            <p key={filter}>{filter}: {value}</p>
          ))}
        </div>
        <div className="right-part">
          <CharacterGrid appliedFilters={appliedFilters} searchTerm={searchTerm} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
