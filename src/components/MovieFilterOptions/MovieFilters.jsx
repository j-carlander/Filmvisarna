import { useState, useEffect } from "react";
import { fetchHelper } from "../../utils/fetchHelper";

export default function MovieFilters({ setMovies }) {
  const [filters, setFilters] = useState({ upcoming: "--" });

  function onSelectChange(e) {
    const value = e.target.value;
    const key = e.target.name;

    setFilters({ ...filters, [key]: value });
  }

  useEffect(() => {
    async function fetchMoviesByFilters(searchFilters) {
      const filterQueries = searchFilters
        .map((filter) => `${filter[0]}=${filter[1]}`)
        .join("&");

      const response = await fetchHelper(`/movies?${filterQueries}`, "get");

      const data = await response.json();

      setMovies(data);
    }

    const searchFilters = Object.entries(filters).filter(
      (filter) => filter[1] !== "--"
    );

    if (searchFilters.length === 0) return;

    fetchMoviesByFilters(searchFilters);
  }, [filters, setMovies]);

  return (
    <ul className="filter-list">
      <li className="filter-item">
        <select
          name="upcoming"
          defaultValue={"--"}
          onChange={onSelectChange}
          className="filter-select">
          <option value={"--"}>--</option>
          <option value={false}>På bio nu</option>
          <option value={true}>Kommande</option>
        </select>
      </li>
    </ul>
  );
}
