import { useEffect } from "react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export function SearchBar({ matchDesktop }) {
  const [searchInput, setSearchInput] = useState("");
  const [urlSearch, setUrlSearch] = useSearchParams(undefined);

  useEffect(() => {
    if (urlSearch) console.log(urlSearch);
  }, [urlSearch]);

  return (
    <form
      className="search-form"
      onSubmit={(e) => {
        e.preventDefault();
        setUrlSearch(searchInput);
      }}>
      <input
        className={`search-input ${
          !matchDesktop ? "search-mobile-input" : "search-desktop-input"
        }`}
        type="text"
        name="search"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <button className="search-btn">
        <img src="/Search.svg" alt="Sök" />
      </button>
    </form>
  );
}
