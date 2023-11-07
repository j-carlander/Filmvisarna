import { SearchResultCard } from "../SearchResultCard/SearchResultCard";
import { Loading } from "../../Loading/Loading";
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
          <Loading />
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
