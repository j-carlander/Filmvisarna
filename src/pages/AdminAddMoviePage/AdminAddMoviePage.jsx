import { useState, useEffect } from "react";
import { fetchHelper } from "../../utils/fetchHelper";
import { AdminFetchingNames } from "../../components/AdminFetchingNames/AdminFetchingNames";

const movieSetup = {
  title: "",
  description: "",
  trailerLink: "",
  durationInMinutes: 0,
  ageLimit: 0,
  directorId: 0,
  releaseDate: "",
  languageid: [],
  categoryIds: [],
  actorNames: [],
  base64Img: "",
};

export function AdminAddMoviePage() {
  const [movie, setMovie] = useState(movieSetup);
  const [names, setNames] = useState([]);
  const [languages, setLanguages] = useState([{ id: 0, language: "sv" }]);
  const [categories, setCategories] = useState([]);
  const [director, setDirector] = useState(undefined);
  const [catSearch, setCatSearch] = useState("");
  const [langSearch, setLangSearch] = useState("");
  const [addLangSearch, setAddLangSearch] = useState("");
  const [addCat, setAddCat] = useState(false);
  const [languageNotFound, setLanguageNotFound] = useState(false);
  const [addedLanguage, setAddedLanguage] = useState(false);

  function handleChange(e) {
    setMovie((movie) => ({ ...movie, [e.target.name]: e.target.value }));
  }

  function onActorClick(id) {
    setNames((old) => old.filter((nameObject) => nameObject.id !== id));
  }

  function handleSetDirector(nameObject) {
    setDirector(nameObject.name);
    setMovie((movie) => ({ ...movie, directorId: nameObject.id }));
  }

  function handleAddActors(nameObject) {
    const oldActorids = movie.actorNames;
    setNames((old) => [...old, nameObject]);
    setMovie((movie) => ({
      ...movie,
      actorNames: [...oldActorids, nameObject.id],
    }));
  }

  function onRemoveCategory(id) {
    const filteredCats = movie.categoryIds.filter((cat) => cat !== id);
    setMovie((old) => ({ ...old, categoryIds: [...filteredCats] }));
    setCategories((old) => old.filter((cat) => cat.id !== id));
  }

  async function onSubmitMovie(e) {
    e.preventDefault();

    const resp = await fetchHelper("/addmovie", "post", movie);

    const json = await resp.json();

    if (resp.status < 400) {
      console.log(json);
    }
  }

  function handleFiles(e) {
    const file = e.target.files[0];
    if (!file) return;
    const fileReader = new FileReader();

    fileReader.onloadend = (event) => {
      const base64 = event.target.result;
      setMovie((movie) => ({ ...movie, base64Img: base64 }));
    };

    fileReader.readAsDataURL(file);
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
      const oldCats = movie.categoryIds;
      setMovie((old) => ({ ...old, categoryIds: [...oldCats, json[0].id] }));
      setCatSearch("");
    } else if (resp.status === 404) {
      setAddCat(true);
    }
  }

  async function onSearchLanguageClick() {
    const response = await fetchHelper(`/searchlanguages?q=${langSearch}`, "get");
    const data = await response.json();
    console.log(data)

    if (data.length === 0) {
        setLanguageNotFound(true);
    } else {
      if (response.status < 400) {
        setLanguageNotFound(false)
        setLanguages((old) => [...old, ...data]);
        const oldLang = movie.languageid
        setMovie((old) => ({
          ...old,
          languageid: [...oldLang, data[0].id],
        }));
        setLangSearch("");
      }
    }
  }

  async function onSearchAddLanguageClick() {
    const response = await fetchHelper(`/addLanguages`, "post", {
      language: addLangSearch
    });
    if (response.status < 400) {
      setAddedLanguage(true)
      setLangSearch("");
    }
  }
  
  useEffect(() => {
    let timeoutId; // Variable to store timeout ID

    if (languageNotFound) {
      timeoutId = setTimeout(() => {
        setLanguageNotFound(false); // Remove the message after 1.5 seconds
      }, 1500);
    }

    if (addedLanguage) {
      timeoutId = setTimeout(() => {
        setAddedLanguage(false);
      }, 1500);
    }

    return () => {
      clearTimeout(timeoutId); // Clear the timeout when the component unmounts or re-renders
    };

  }, [languageNotFound, addedLanguage]);

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
              name="trailerLink"
              required
              value={movie.trailerLink}
              onChange={handleChange}
            />
          </label>
          <div className="length-and-age-container">
            <label htmlFor="">
              <span>Filmlängd i minuter:</span>
              <input
                type="number"
                required
                name="durationInMinutes"
                value={movie.durationInMinutes}
                onChange={handleChange}
              />
            </label>
            <label htmlFor="">
              <span>Åldersgräns:</span>
              <select
                name="ageLimit"
                required
                onChange={handleChange}
                value={movie.ageLimit}>
                <option value={0}>alla</option>
                <option value={7}>7 +</option>
                <option value={11}>11 +</option>
                <option value={15}>15 +</option>
              </select>
            </label>
            <label htmlFor="">
              <span>Premiärdatum:</span>
              <input
                type="date"
                required
                name="releaseDate"
                value={movie.releaseDate}
                onChange={handleChange}
              />
            </label>
          </div>
          <label htmlFor="">
            <span>Välj regissör:</span>
            <AdminFetchingNames onSetName={handleSetDirector} />
            <span>
              Nuvarande regisör: {director || "Ingen regisör är vald!"}
            </span>
          </label>
        </div>
        <div className="grid-column">
          <label htmlFor="">
          <span>Sök språk/textspråk:</span>
          <input 
              placeholder="Sök språk"
              onChange={(e) => setLangSearch(e.target.value)}
              value={langSearch}
              maxLength={3}
            />
            {languageNotFound && <p>Språk ej hittat!</p>}
            <button
              className="search-cat-btn"
              onClick={onSearchLanguageClick}
              type="button">
              Sök
            </button>
            <span>Lägg till ny språk:</span>
            <input 
                placeholder="Lägg till nytt språk"
                onChange={(e) => setAddLangSearch(e.target.value)}
                value={addLangSearch}
                maxLength={3}
              />
              {addedLanguage && <p>Språk Har Lagts In I Databasen</p>}
              <button
                className="search-cat-btn"
                onClick={onSearchAddLanguageClick}
                type="button">
                Sök
              </button>
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
            <ul name="categoryIds" required className="category-list">
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
              name="actorNames"
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
          {movie.base64Img ? <img src={movie.base64Img} width={200} /> : null}
        </div>
        <button className="add-movie-btn" type="submit">
          Lägg till film!
        </button>
      </form>
    </article>
  );
}
