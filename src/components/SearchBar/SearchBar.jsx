import { useEffect, useRef } from "react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSearchMovie } from "../../hooks/useSearchMovie";

export function SearchBar({ matchDesktop }) {
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search");

  const [searchInput, setSearchInput] = useState(search);

  const searchInputRef = useRef();

  const [isLoading, movieResult] = useSearchMovie(search);
  console.log("movie result: ", movieResult);
  console.log("search: ", search ? true : false);
  console.log("isLoading: ", isLoading);

  useEffect(() => {
    if (showMobileSearch) searchInputRef.current.focus();
    !searchInput
      ? setSearchParams(undefined)
      : setSearchParams([["search", searchInput]]);
  }, [searchInput, setSearchParams, showMobileSearch]);

  return (
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
            onBlur={() => setShowMobileSearch(false)}
          />
          <button className="search-btn">
            <img src="/Search.svg" alt="Sök" />
          </button>
        </form>
      )}
      {/* <article>
        <h2>Din sökning på {search} gav följande resultat:</h2>
      </article> */}
    </section>
  );
}
