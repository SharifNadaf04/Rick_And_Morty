import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';


const CharacterCard = ({ character }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleClick = async () => {
    try {
      setLoading(true);

      
      const response = await fetch(`https://rickandmortyapi.com/api/character/${character.id}`);
      if (!response.ok) {
        throw new Error(`API error: ${response.status} - ${response.statusText}`);
      }

      const characterDetails = await response.json();

  
      navigate(`/profile/${character.id}`, { state: { character: characterDetails } });
    } catch (error) {
      console.error('Error fetching character details:', error.message);
      setError('Error fetching character details. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="character-card" onClick={handleClick}>
      {/* Display character information */}
      <img src={character.image} alt={character.name} />
      <p>{character.name}</p>

      {/* Loading and error states */}
      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

CharacterCard.propTypes = {
  character: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    // Add other required props here
  }).isRequired,
};


export default CharacterCard;
