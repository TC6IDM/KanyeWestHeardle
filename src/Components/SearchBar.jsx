import React, { useState } from 'react';
import '../Styles/SearchBar.css';

const SearchBar = ({setInput2, songs }) => {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  // console.log(myData)
  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);
    setInput2(value);
    
    if (value) {
      // const songsArray = Object.values(myData);
      // console.log(songsArray)
      const filteredSongs = songs.filter(song => 
        song.title.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSongs);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
    setInput2(suggestion);
    setSuggestions([]);
  };

  return (
    <div className="search-container">
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((suggestion, index) => (
            <li 
              key={index} 
              onClick={() => handleSuggestionClick(suggestion.title)}
            >
              {suggestion.title}
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
