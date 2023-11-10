import { useEffect, useState } from "react";
import { fetchHelper } from "../../utils/fetchHelper";

const mockLanguages = [
  { id: 1, language: "sv" },
  { id: 2, language: "eng" },
];

export function AdminAddScreeningPage() {
  const [movies, setMovies] = useState([]);
  const [theatre, setTheatre] = useState([]);
  const [language, setLanguage] = useState(mockLanguages);
  const [values, setValues] = useState({date:"", movieid:1, theatreid:1, languageid:1, subtitleid:1});

    function onChange(event) {
        const name = event.target.name;
        let value = event.target.value;

        if (name === "date") {
            value = value.replace("T", " ")
        }
        setValues({...values, [name]: value})
    }

    async function onSubmit(event) {
        event.preventDefault();
    }

  useEffect(() => {
    async function fetchMovies() {
      const respons = await fetchHelper("/movies", "get");
      const json = await respons.json();
      setMovies(json);
    }
    async function fetchTheatres() {
      const respons = await fetchHelper("/theatres", "get");
      const json = await respons.json();
      setTheatre(json);
    }
    fetchMovies();
    fetchTheatres();
  }, []);
  return (
    <div className="add-screening-page">
      <form className="form-wrapper" onSubmit={onSubmit}>
        <input className="date-input" name="date" type="datetime-local" onChange={onChange}></input>
        <select className="select-element" name="movieid" onChange={onChange}>
          {movies.map((movie) => (
            <option value={movie.id} key={movie.id}>
              {movie.title}
            </option>
          ))}
        </select>
        <select className="select-element" name="theatreid" onChange={onChange}>
          {theatre.map((theatre) => (
            <option value={theatre.id} key={`theatre${theatre.id}`}>
              {theatre.name}
            </option>
          ))}
        </select>
        <select className="select-element" name="languageid" onChange={onChange}>
          {language.map((language) => (
            <option value={language.id} key={`language-speech-${language.id}`}>
              {language.language}
            </option>
          ))}
        </select>
        <select className="select-element" name="subtitleid" onChange={onChange}>
          {language.map((language) => (
            <option
              value={language.id}
              key={`language-subtitle-${language.id}`}>
              {language.language}
            </option>
          ))}
        </select>
        <button>Lägg till visning</button>
      </form>
    </div>
  );
}
