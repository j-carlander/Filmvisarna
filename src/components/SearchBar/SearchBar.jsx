/**
 * Component for searching on the website
 * It allows users to search for movies (for example title, genre, 
 * actors, director) and displays search results. 
 * adjusts its appearance based on the screen size.
 */

import { useEffect, useRef } from "react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSearchMovie } from "../../hooks/useSearchMovie";
import { SearchResult } from "./SearchResult/SearchResult";

export function SearchBar({ matchDesktop }) {
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search");
  const searchInit = search ? search : "";
  const [searchInput, setSearchInput] = useState(searchInit);

  const searchInputRef = useRef();

  const [isLoading, movieResult, message] = useSearchMovie(search);

  useEffect(() => {
    if (showMobileSearch) searchInputRef.current.focus();
    !searchInput
      ? setSearchParams((oldVal) => {
          oldVal.delete("search");
          return oldVal;
        })
      : setSearchParams((oldVal) => {
          oldVal.set("search", searchInput);
          return oldVal;
        });
  }, [searchInput, setSearchParams, showMobileSearch]);

  function clearSearch() {
    setSearchInput("");
    setSearchParams((oldVal) => {
      oldVal.delete("search");
      return oldVal;
    });
  }

  return (
    <div className={showMobileSearch ? "wrapper-position-absolute" : ""}>
      <section className="search-section">
        {!matchDesktop.matches && !showMobileSearch ? (
          <button
            className="search-btn"
            onClick={() => setShowMobileSearch(true)}>
            <img src="/Search.svg" alt="Öppna Sök" />
          </button>
        ) : (
          <form
            className="search-form"
            onSubmit={(e) => {
              e.preventDefault();
              // setSearchParams([["search", searchInput]]);
            }}>
            <div className="search-input-relative-input">
              <input
                ref={searchInputRef}
                className={`search-input ${
                  !matchDesktop.matches
                    ? "search-input-mobile"
                    : "search-input-desktop"
                }`}
                type="text"
                value={searchInput}
                placeholder="Sök..."
                onChange={(e) => setSearchInput(e.target.value)}
                onBlur={() => {
                  if (!searchInput) return setShowMobileSearch(false);
                }}
              />
              {searchInput ? (
                <button
                  className="search-input-clear-btn"
                  type="button"
                  onClick={clearSearch}>
                  &#x2715;
                </button>
              ) : null}
            </div>
            <button className="search-btn">
              <img src="/Search.svg" alt="Sök" />
            </button>
          </form>
        )}
        {searchInput !== "" && (
          <SearchResult
            {...{
              isLoading,
              movieResult,
              message,
              clearSearch,
              setShowMobileSearch,
            }}
          />
        )}
      </section>
    </div>
  );
}
