import { useState, useEffect } from "react";
import { fetchHelper } from "../../utils/fetchHelper";

export default function MovieFilters({ setMovies, initialUpcoming }) {
  const [filters, setFilters] = useState({
    upcoming: initialUpcoming || "false",
    age: "Välj ålder",
    date: "--",
  });

  function onSelectChange(e) {
    const value = e.target.value;
    const key = e.target.name;

    setFilters({ ...filters, [key]: value });
  }

  function onDateInputChange(e) {
    const value = e.target.value;

    setFilters({ ...filters, date: value });
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
      (filter) =>
        filter[1] !== "--" && !filter[1].startsWith("Välj") && filter[1] !== ""
    );

    if (searchFilters.length === 0) return;

    fetchMoviesByFilters(searchFilters);
  }, [filters, setMovies, initialUpcoming]);

  return (
    <ul className="filter-list">
      <li className="filter-item">
        <select
          name="upcoming"
          defaultValue={initialUpcoming}
          onChange={onSelectChange}
          className="filter-select">
          <option value={false}>På bio nu</option>
          <option value={true}>Kommande</option>
        </select>
      </li>
      <li className="filter-item">
        <input
          className="filter-date-input"
          type="date"
          onChange={onDateInputChange}
        />
      </li>
      <li className="filter-item">
        <select
          name="age"
          defaultValue={"--"}
          onChange={onSelectChange}
          className="filter-select">
          <option value={"Välj ålder"}>Välj ålder</option>
          <option value={0}>alla</option>
          <option value={7}>7</option>
          <option value={11}>11</option>
          <option value={15}>15</option>
        </select>
      </li>
    </ul>
  );
}
