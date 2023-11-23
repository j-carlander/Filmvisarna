/**
 * Hook for searching movies in searchbar. User can search on title, genre, actor and director.
 */

import { useState } from "react";
import { useEffect } from "react";
import { fetchHelper } from "../utils/fetchHelper";

export function useSearchMovie(query) {
  const [isLoading, setIsLoading] = useState(false);
  const [movieResult, setMovieResult] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setMessage("");
    async function searchMovies() {
      if (!query) return setIsLoading(false);

      const result = await fetchHelper(`/movies/search?q=${query}`, "GET");

      const jsonResult = await result.json();

      if (result.status >= 400) {
        setMessage(jsonResult.message || jsonResult.error);
        setIsLoading(false);
        setMovieResult([{ test: "test" }]);
        return;
      }

      if (jsonResult.result.length > 0) setMovieResult(jsonResult.result);

      setIsLoading(false);
    }
    let timeoutId;

    if (query) {
      setIsLoading(true);

      timeoutId = setTimeout(searchMovies, 500);
    }

    return () => {
      setIsLoading(false);
      setMovieResult([]);
      clearTimeout(timeoutId);
    };
  }, [query]);

  return [isLoading, movieResult, message];
}
