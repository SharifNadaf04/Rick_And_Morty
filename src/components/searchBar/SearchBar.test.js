import React from 'react';
import { render, screen } from '@testing-library/react';
import SearchBar from './SearchBar';

test('renders SearchBar component', () => {
  render(<SearchBar onSearch={() => {}} />); // Provide a function for onSearch prop
  const searchBarElement = screen.getByTestId('search-bar');
  expect(searchBarElement).toBeInTheDocument();
});
