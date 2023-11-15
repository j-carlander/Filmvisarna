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
  const [subtitle, setSubtitle] = useState([{ id: 1, language: "sv" }]);
  const [values, setValues] = useState({
    date: "",
    movieid: 1,
    theatreid: 1,
    languageid: 1,
    subtitleid: 1,
  });
  const [serverMessage, setServerMessage] = useState("");

  function onChange(event) {
    const name = event.target.name;
    let value = event.target.value;

    if (name === "date") {
      value = value.replace("T", " ");
    }
    setValues({ ...values, [name]: value });
  }

  async function onSubmit(event) {
    event.preventDefault();

    setServerMessage("");

    if (values.date === "")
      return setServerMessage("Du måste sätta ett datum!");

    const response = await fetchHelper("/addscreening", "post", values);

    const json = await response.json();
    if (response.status < 400) {
      setServerMessage(json.message);
      setValues({ ...values, date: "" });
    } else {
      setServerMessage(json.error);
    }
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

  useEffect(() => {
    async function fetchLanguageByMovie() {
      const respons = await fetchHelper(`/language/${values.movieid}`, "get");
      const json = await respons.json();
      setLanguage(json);
    }
    fetchLanguageByMovie();
  }, [values.movieid]);

  return (
    <div className="add-screening-page">
      <h2>Lägg till visning</h2>
      <form className="form-wrapper" onSubmit={onSubmit}>
        <label>Datum och tid för visning:</label>
        <input
          className="date-input"
          name="date"
          type="datetime-local"
          onChange={onChange}
          value={values.date}
        />
        <label>Välj film:</label>
        <select className="select-element" name="movieid" onChange={onChange}>
          {movies.map((movie) => (
            <option value={movie.id} key={movie.id}>
              {movie.title}
            </option>
          ))}
        </select>
        <label>Välj salong:</label>
        <select className="select-element" name="theatreid" onChange={onChange}>
          {theatre.map((theatre) => (
            <option value={theatre.id} key={`theatre${theatre.id}`}>
              {theatre.name}
            </option>
          ))}
        </select>
        <label>Välj talspråk:</label>
        <select
          className="select-element"
          name="languageid"
          onChange={onChange}>
          {language.map((language) => (
            <option value={language.id} key={`language-speech-${language.id}`}>
              {language.language}
            </option>
          ))}
        </select>
        <label>Välj undertext:</label>
        <select
          className="select-element"
          name="subtitleid"
          onChange={onChange}>
          {subtitle.map((language) => (
            <option
              value={language.id}
              key={`language-subtitle-${language.id}`}>
              {language.language}
            </option>
          ))}
        </select>
        <button>Lägg till visning</button>
        <p>{serverMessage}</p>
      </form>
    </div>
  );
}
