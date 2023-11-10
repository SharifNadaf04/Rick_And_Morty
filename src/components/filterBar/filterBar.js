import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import Dropdown from "../dropdown/dropdown";

import "./filterBar.css";

const FilterBar = ({ onApplyFilter }) => {
  const [statusOptions, setStatusOptions] = useState([]);
  const [locationOptions, setLocationOptions] = useState([]);
  const [episodeOptions, setEpisodeOptions] = useState([]);
  const [genderOptions, setGenderOptions] = useState([]);
  const [speciesOptions, setSpeciesOptions] = useState([]);
  const [typeOptions, setTypeOptions] = useState([]);

  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedEpisode, setSelectedEpisode] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedSpecies, setSelectedSpecies] = useState("");
  const [selectedType, setSelectedType] = useState("");

  useEffect(() => {
    fetch("https://rickandmortyapi.com/api/character")
      .then((response) => response.json())
      .then((data) => {
        const uniqueStatusOptions = [
          ...new Set(data.results.map((character) => character.status)),
        ];
        const uniqueLocationOptions = [
          ...new Set(data.results.map((character) => character.location.name)),
        ];
        const uniqueEpisodeOptions = [
          ...new Set(
            data.results.flatMap((character) =>
              character.episode.map((ep) => ep)
            )
          ),
        ];
        const uniqueGenderOptions = [
          ...new Set(data.results.map((character) => character.gender)),
        ];
        const uniqueSpeciesOptions = [
          ...new Set(data.results.map((character) => character.species)),
        ];
        const uniqueTypeOptions = [
          ...new Set(data.results.map((character) => character.type)),
        ];

        setStatusOptions(uniqueStatusOptions);
        setLocationOptions(uniqueLocationOptions);
        setEpisodeOptions(uniqueEpisodeOptions);
        setGenderOptions(uniqueGenderOptions);
        setSpeciesOptions(uniqueSpeciesOptions);
        setTypeOptions(uniqueTypeOptions);
      })
      .catch((error) => console.error("Error fetching options:", error));
  }, []);

  const handleApplyClick = () => {
    onApplyFilter({
      status: selectedStatus,
      location: selectedLocation,
      episode: selectedEpisode,
      gender: selectedGender,
      species: selectedSpecies,
      type: selectedType,
    });
  };

  return (
    <div className="parent-filter-container">
      <div className="filter-bar">
        <div className="filter-row">
          <div className="filter-option">
            <label htmlFor="status">Status:</label>
            <Dropdown
              options={statusOptions}
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            />
          </div>
          <div className="filter-option">
            <label htmlFor="location">Location:</label>
            <Dropdown
              options={locationOptions}
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            />
          </div>
          <div className="filter-option">
            <label htmlFor="episode">Episodes:</label>
            <Dropdown
              options={episodeOptions}
              value={selectedEpisode}
              onChange={(e) => setSelectedEpisode(e.target.value)}
            />
          </div>
        </div>
        <div className="filter-row">
          <div className="filter-option">
            <label htmlFor="gender">Gender:</label>
            <Dropdown
              options={genderOptions}
              value={selectedGender}
              onChange={(e) => setSelectedGender(e.target.value)}
            />
          </div>
          <div className="filter-option">
            <label htmlFor="species">Species:</label>
            <Dropdown
              options={speciesOptions}
              value={selectedSpecies}
              onChange={(e) => setSelectedSpecies(e.target.value)}
            />
          </div>
          <div className="filter-option">
            <label htmlFor="type">Type:</label>
            <Dropdown
              options={typeOptions}
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div>
        <button onClick={handleApplyClick}>Apply</button>
      </div>
    </div>
  );
};

FilterBar.propTypes = {
  onApplyFilter: PropTypes.func.isRequired, 
};

export default FilterBar;
