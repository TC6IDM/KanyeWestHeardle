import React, { useState } from 'react';
import '../Styles/SearchBar.css';

const SearchBar = ({ songs }) => {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);
    if (value) {
      const filteredSongs = songs.filter(song => 
        song.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSongs);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
    setSuggestions([]);
  };

  return (
    <div className="search-container">
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((suggestion, index) => (
            <li 
              key={index} 
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
      <input
        type="text"
        value={input}
        onChange={handleChange}
        placeholder="Know it? Search for the title"
        className="search-input"
      />
    </div>
  );
};

export default SearchBar;
