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
      if (result.status === 204) {
        setMessage("Hittade inga filmer");
        setIsLoading(false);
        return;
      }

      const jsonResult = await result.json();

      if (jsonResult.result.length > 0) setMovieResult(jsonResult.result);

      setIsLoading(false);
    }
    let timeoutId;

    if (query) {
      setIsLoading(true);

      timeoutId = setTimeout(searchMovies, 2000);
    }

    return () => {
      setIsLoading(false);
      setMovieResult([]);
      clearTimeout(timeoutId);
    };
  }, [query]);

  return [isLoading, movieResult, message];
}
