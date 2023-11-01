import { SearchResultCard } from "../SearchResultCard/SearchResultCard";

export function SearchResult({
  isLoading,
  movieResult,
  message,
  clearSearch,
  setShowMobileSearch,
}) {
  return (
    <>
      <article className="search-result-container">
        {isLoading ? (
          <div className="loading">
            <div className="loading-inner"></div>
          </div>
        ) : message !== "" ? (
          <p>{message}</p>
        ) : (
          movieResult.map((movie) => (
            <SearchResultCard
              movie={movie}
              key={movie.id}
              clearSearch={clearSearch}
              setShowMobileSearch={setShowMobileSearch}
            />
          ))
        )}
      </article>
    </>
  );
}
