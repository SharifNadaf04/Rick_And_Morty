import React from 'react';
import './characterProfile.css';
import PropTypes from 'prop-types';


const CharacterProfile = ({ character }) => {
  return (
    <div className="character-profile">
      <div className="profile-image">
        <img src={character.image} alt={character.name} />
      </div>
      <div className="profile-details">
        <h2>{character.name}</h2>
        <p>Species: {character.species}</p>
        <p>Status: {character.status}</p>
        <p>Location: {character.location.name}</p>
      </div>
    </div>
  );
};

CharacterProfile.propTypes = {
  character: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    species: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    location: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    
  }).isRequired,
};


export default CharacterProfile;
