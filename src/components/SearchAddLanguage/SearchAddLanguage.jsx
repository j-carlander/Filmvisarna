/**
 * Component for searching and adding languages
 * Admin and Super role use only
 * enter a search query, and if no languages are found, 
 * the option to add a new language is provided.
 */

import React, { useState } from "react";
import { fetchHelper } from "../../utils/fetchHelper";

const SearchAddLanguage = () => {
  const [query, setQuery] = useState("");
  
  const handleSearch = async () => {
    if (!query.trim()) return;
    
    try {
      const response = await fetchHelper(`/searchlanguages?q=${query}`, "GET");
      const data = await response.json();

      if (data && data.length === 0) {
        // If no languages found, add a new language
        await addLanguage();
      }
    } catch (error) {
      console.error("Error searching for languages:", error);
    }
  }

  const addLanguage = async () => {
    try {
      const addResponse = await fetchHelper('/addLanguages', 'POST');
      const addData = await addResponse.json();
    } catch (error) {
      console.error("Error adding language:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Sök efter språk..."
      />
      <button onClick={handleSearch}>Sök/Lägg till språk</button>
    </div>
  );
};

export default SearchAddLanguage;
