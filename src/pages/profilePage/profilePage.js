import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './profilePage.css';

const ProfilePage = () => {
  const { state } = useLocation();
  const characterDetails = state?.character;
  const [episodeDetails, setEpisodeDetails] = useState([]);
  const [originDetails, setOriginDetails] = useState(null);
  const [characterImages, setCharacterImages] = useState([]);

  useEffect(() => {
    
    const fetchData = async () => {
      const episodePromises = characterDetails.episode.map((episodeUrl) =>
        fetch(episodeUrl).then((response) => response.json())
      );
      const episodes = await Promise.all(episodePromises);
      setEpisodeDetails(episodes);

      const originResponse = await fetch(characterDetails.origin.url);
      const originData = await originResponse.json();
      setOriginDetails(originData);

      const characterPromises = characterDetails.episode
        .flatMap((episode) => episode.characters)
        .map((characterUrl) => fetch(characterUrl).then((response) => response.json()));
      const characters = await Promise.all(characterPromises);
      setCharacterImages(characters);
    };

    fetchData();
  }, [characterDetails]);

  if (!characterDetails) {
    return <div>Error: Character details not available.</div>;
  }

  return (
    <div className="profile-page">
  
      <Link to="/" className="back-button">
        &lt; Back
      </Link>


      <div className="top-section">
    
        <img src={characterDetails.image} alt={characterDetails.name} />
      </div>

  
      <div className="bottom-section">
        <div className="left-half">
          {/* General info */}
          <h2>General Information</h2>
          <p>Name: {characterDetails.name}</p>
          <p>Species: {characterDetails.species}</p>
          <p>Gender: {characterDetails.gender}</p>
        </div>
        <div className="right-half">
          {/* Origin info */}
          <h2>Origin Information</h2>
          {originDetails && (
            <>
              <p>Dimension: {originDetails.dimension}</p>
              <p>Amount of Residents: {originDetails.residents.length}</p>
              <p>Origin Name: {originDetails.name}</p>
            </>
          )}
        </div>
      </div>

      {/* Important Info Card */}
      <div className="important-info">
        <h2>Important Information</h2>
        {/* Display episode information */}
        {episodeDetails.map((episode, index) => (
          <div key={episode.id}>
            <p>Episode Name: {episode.name}</p>
            <p>
              Characters: {characterImages[index]?.name || 'Unknown'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

ProfilePage.propTypes = {
  character: PropTypes.object.isRequired,
};

export default ProfilePage;
