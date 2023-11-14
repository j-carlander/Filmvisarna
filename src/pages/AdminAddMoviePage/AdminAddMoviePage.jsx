import { useState, useEffect } from "react";
import { fetchHelper } from "../../utils/fetchHelper";
import { AdminFetchingNames } from "../../components/AdminFetchingNames/AdminFetchingNames";

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
  const [names, setNames] = useState([]);
  const [languages, setLanguages] = useState([{ id: 0, language: "sv" }]);
  const [categories, setCategories] = useState([]);
  const [director, setDirector] = useState(undefined);
  const [catSearch, setCatSearch] = useState("");
  const [addCat, setAddCat] = useState(false);

  function handleChange(e) {
    setMovie((movie) => ({ ...movie, [e.target.name]: e.target.value }));
  }

  function onActorClick(id) {
    setNames((old) => old.filter((nameObject) => nameObject.id !== id));
  }

  function handleSetDirector(nameObject) {
    setDirector(nameObject.name);
    setMovie((movie) => ({ ...movie, directorid: nameObject.id }));
  }

  function handleAddActors(nameObject) {
    const oldActorids = movie.actorids;
    setNames((old) => [...old, nameObject]);
    setMovie((movie) => ({
      ...movie,
      actorids: [...oldActorids, nameObject.id],
    }));
  }

  function onRemoveCategory(id) {
    const filteredCats = movie.categoryids.filter((cat) => cat !== id);
    setMovie((old) => ({ ...old, categoryids: [...filteredCats] }));
    setCategories((old) => old.filter((cat) => cat.id !== id));
  }

  async function onSubmitMovie(e) {
    e.preventDefault();
    console.log(movie);
    console.log("Submit movie");
  }

  function handleFiles(e) {
    const file = e.target.files[0];
    if (file) {
      const base64 = URL.createObjectURL(file);
      setMovie((movie) => ({ ...movie, imgbase64: base64 }));
    }
  }

  async function fetchAddCategory() {
    const resp = await fetchHelper(`/addgenre`, "post", { genre: catSearch });

    const json = await resp.json();

    if (resp.status < 400) {
      setCategories((old) => [...old, json]);
      setCatSearch("");
      setAddCat(false);
    }
  }

  async function onSearchCategoryClick() {
    const resp = await fetchHelper(`/searchgenre?q=${catSearch}`, "get");

    const json = await resp.json();

    if (resp.status < 400) {
      setCategories((old) => [...old, ...json]);
      const oldCats = movie.categoryids;
      setMovie((old) => ({ ...old, categoryids: [...oldCats, json[0].id] }));
      setCatSearch("");
    } else if (resp.status === 404) {
      setAddCat(true);
    }
  }

  useEffect(() => {}, []);

  // TODO:
  // useEffect to fetch and set languages
  // Fetch to submit form
  // Options for adding languages that is not in their list.

  return (
    <article className="admin-add-movie-page-wrapper">
      <h2>Lägg till en ny film</h2>
      <form className="new-movie-form" onSubmit={onSubmitMovie}>
        <div className="grid-column">
          <label htmlFor="">
            <span>Filmtitel:</span>
            <input
              type="text"
              name="title"
              required
              value={movie.title}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="">
            <span>Filmbeskrivning:</span>
            <textarea
              name="description"
              cols="30"
              rows="5"
              required
              value={movie.description}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="">
            <span>Länk till trailer:</span>
            <input
              type="text"
              name="trailerlink"
              required
              value={movie.trailerlink}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="">
            <span>Filmlängd i minuter:</span>
            <input
              type="number"
              required
              name="durationinminutes"
              value={movie.durationinminutes}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="">
            <span>Åldersgräns:</span>
            <select
              name="agelimit"
              required
              onChange={handleChange}
              value={movie.agelimit}>
              <option value={0}>alla</option>
              <option value={7}>7 +</option>
              <option value={11}>11 +</option>
              <option value={15}>15 +</option>
            </select>
          </label>
          <label htmlFor="">
            <span>Välj regissör:</span>
            <AdminFetchingNames onSetName={handleSetDirector} />
            <span>
              Nuvarande regisör: {director || "Ingen regisör är vald!"}
            </span>
          </label>
          <label htmlFor="">
            <span>Premiärdatum:</span>
            <input
              type="date"
              required
              name="releasedate"
              value={movie.releasedate}
              onChange={handleChange}
            />
          </label>{" "}
        </div>
        <div className="grid-column">
          <label htmlFor="">
            <span>Välj språk:</span>
            <select name="languageid" onChange={handleChange} multiple required>
              {languages.map((language) => (
                <option value={language.id} key={`language_${language.id}`}>
                  {language.language}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="">
            <span>Välj textspråk:</span>
            <select name="subtitleid" onChange={handleChange} multiple required>
              {languages.map((language) => (
                <option value={language.id} key={`subtitle_${language.id}`}>
                  {language.language}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="">
            <span>Välj en eller flera kategorier:</span>
            <input
              placeholder="Sök kategori"
              onChange={(e) => setCatSearch(e.target.value)}
              value={catSearch}
            />{" "}
            <button
              className="search-cat-btn"
              onClick={onSearchCategoryClick}
              type="button">
              Sök
            </button>
            {addCat && (
              <div className="add-cat-container">
                <p>Genren hittades inte. Vill du lägga till den?</p>
                <button type="button" onClick={fetchAddCategory}>
                  Ja
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAddCat(false);
                    setCatSearch("");
                  }}>
                  Nej
                </button>
              </div>
            )}
            {categories.length > 0 ? (
              <span>Klicka på en kategori för att ta bort den</span>
            ) : (
              <span>Inga kategorier har lagts till!</span>
            )}
            <ul name="categoryids" required className="category-list">
              {categories.map((category) => (
                <li
                  value={category.id}
                  key={`category_${category.id}`}
                  onClick={() => onRemoveCategory(category.id)}>
                  {category.category}
                </li>
              ))}
            </ul>
          </label>
          <label htmlFor="">
            <span>Välj några av de skådespelare som är med:</span>
            <AdminFetchingNames onSetName={handleAddActors} />
            <span>Klicka på ett namn för att ta bort det</span>
            <ul
              name="actorids"
              className="category-list"
              onChange={handleChange}
              required>
              {names.map((name) => (
                <li
                  value={name.id}
                  key={`actor_${name.id}`}
                  onClick={() => onActorClick(name.id)}>
                  {name.name}
                </li>
              ))}
            </ul>
          </label>
          <div className="img-file-container">
            <label htmlFor="imgFile">Välj filmomslag:</label>
            <input id="imgFile" type="file" required onChange={handleFiles} />
          </div>
          {movie.imgbase64 ? <img src={movie.imgbase64} width={200} /> : null}
        </div>
        <button className="add-movie-btn" type="submit">
          Lägg till film!
        </button>
      </form>
    </article>
  );
}
