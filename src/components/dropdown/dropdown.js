import React from 'react';
import PropTypes from 'prop-types';
import './dropdown.css';

const Dropdown = ({ options, value, onChange }) => {
  return (
    <select className="dropdown" value={value} onChange={onChange}>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

Dropdown.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Dropdown;
