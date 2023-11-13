import { useState } from "react";

const movieSetup = {
  title: "",
  description: "",
  trailerlink: "",
  durationinminutes: 0,
  agelimit: 0,
  directorid: 0,
  releasedate: "",
  languageid: 0,
  subtitleid: 0,
  categoryids: [],
  actorids: [],
  imgbase64: "",
};

export function AdminAddMoviePage() {
  const [movie, setMovie] = useState(movieSetup);
  const [names, setNames] = useState([{ id: 0, name: "John Doe" }]);
  const [languages, setLanguages] = useState([{ id: 0, language: "sv" }]);
  const [categories, setCategories] = useState([{ id: 0, category: "komedi" }]);

  function handleChange(e) {
    setMovie((movie) => ({ ...movie, [e.target.name]: e.target.value }));
  }

  function handleFiles(e) {
    const file = e.target.files[0];
    if (file) {
      const base64 = URL.createObjectURL(file);
      setMovie((movie) => ({ ...movie, imgbase64: base64 }));
    }
  }

  // TODO:
  // useEffect to fetch and set names, languages and categories
  // Fetch to submit form
  // Options for adding names, languages and categories that is not in their list.

  return (
    <article className="admin-add-movie-page-wrapper">
      <h2>Lägg till en ny film</h2>
      <form className="new-movie-form">
        <div className="grid-column">
          <label htmlFor="">
            Filmtitel:
            <input
              type="text"
              name="title"
              value={movie.title}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="">
            Filmbeskrivning:
            <textarea
              name="description"
              cols="30"
              rows="5"
              value={movie.description}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="">
            Länk till trailer:
            <input
              type="text"
              name="trailerlink"
              value={movie.trailerlink}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="">
            Filmlängd i minuter:
            <input
              type="number"
              name="durationinminutes"
              value={movie.durationinminutes}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="">
            Åldersgräns:
            <input
              type="number"
              name="agelimit"
              value={movie.agelimit}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="">
            Välj regissör:
            <select name="directorid" onChange={handleChange}>
              {names.map((name) => (
                <option value={name.id} key={`name_${name.id}`}>
                  {name.name}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="">
            Premiärdatum:
            <input
              type="date"
              name="releasedate"
              value={movie.releasedate}
              onChange={handleChange}
            />
          </label>{" "}
        </div>
        <div className="grid-column">
          <label htmlFor="">
            Välj språk:
            <select name="languageid" onChange={handleChange} multiple>
              {languages.map((language) => (
                <option value={language.id} key={`language_${language.id}`}>
                  {language.language}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="">
            Välj textspråk:
            <select name="subtitleid" onChange={handleChange} multiple>
              {languages.map((language) => (
                <option value={language.id} key={`subtitle_${language.id}`}>
                  {language.language}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="">
            Välj en eller flera kategorier:
            <select name="categoryids" onChange={handleChange} multiple>
              {categories.map((category) => (
                <option value={category.id} key={`category_${category.id}`}>
                  {category.category}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="">
            Välj några av de skådespelare som är med:
            <select name="actorids" onChange={handleChange} multiple>
              {names.map((name) => (
                <option value={name.id} key={`actor_${name.id}`}>
                  {name.name}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="">
            Välj filmomslag:
            <input type="file" onChange={handleFiles} />
          </label>
          {movie.imgbase64 ? <img src={movie.imgbase64} width={200} /> : null}
        </div>
      </form>
    </article>
  );
}
