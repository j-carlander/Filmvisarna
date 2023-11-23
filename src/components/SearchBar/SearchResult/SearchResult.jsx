/**
 * Component for searchresult in searchbar
 * serves as a container for displaying search results. 
 * Renders loading indicators, error messages, 
 * or when successfull a list of SearchResultCard components 
 * for each movie in the result.
 */

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
