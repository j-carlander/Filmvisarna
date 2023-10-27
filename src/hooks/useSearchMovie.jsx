import { useState } from "react";
import { useEffect } from "react";
import { fetchHelper } from "../utils/fetchHelper";

export function useSearchMovie(query) {
  const [isLoading, setIsLoading] = useState(false);
  const [movieResult, setMovieResult] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    async function searchMovies() {
      if (!query) return setIsLoading(false);

      const result = await fetchHelper(`/movies/search?q=${query}`, "GET");
      const jsonResult = await result.json();

      if (jsonResult.result.length > 0) setMovieResult(jsonResult.result);

      setIsLoading(false);
    }

    const timeoutId = setTimeout(searchMovies, 2000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [query]);

  return [isLoading, movieResult];
}
