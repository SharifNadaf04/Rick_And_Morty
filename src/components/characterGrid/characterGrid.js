import React, { useState, useEffect } from 'react';
import CharacterCard from '../characterCard/characterCard';
import PropTypes from 'prop-types';


import './characterGrid.css';

const CharacterGrid = ({ appliedFilters, searchTerm }) => {
  const [characters, setCharacters] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    
    const apiUrl = 'https://rickandmortyapi.com/api/character/';
    const filterParams = Object.entries(appliedFilters)
      .filter(([value]) => value !== '')
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join('&');
    const searchParam = searchTerm ? `name=${encodeURIComponent(searchTerm)}` : '';

    const urlWithFilters = filterParams || searchParam
      ? `${apiUrl}?${filterParams}${filterParams && searchParam ? '&' : ''}${searchParam}`
      : apiUrl;

    fetch(urlWithFilters)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`API error: ${response.status} - ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => setCharacters(data.results))
      .catch((error) => {
        console.error('Error fetching character data:', error.message);
        setError('Error fetching character data. Please try again later.');
      });
  }, [appliedFilters, searchTerm]);

  return (
    <div className="character-grid">
      {error ? (
        <p className="error-message">{error}</p>
      ) : (
        characters.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))
      )}
    </div>
  );
};

CharacterGrid.propTypes = {
  appliedFilters: PropTypes.object.isRequired,
  searchTerm: PropTypes.string,
};


export default CharacterGrid;
