import useLanguagesHook from "../../hooks/useLanguagesHook";
import { fetchHelper } from "../../utils/fetchHelper";
import { useState } from "react";

export default function AdminLanguages({
  languages,
  setLanguages,
  movie,
  setMovie,
}) {
  const [langSearch, setLangSearch] = useState("");
  const [addLangSearch, setAddLangSearch] = useState("");
  const [
    languageNotFound,
    setLanguageNotFound,
    addedLanguage,
    setAddedLanguage,
  ] = useLanguagesHook();

  async function onSearchLanguageClick() {
    const response = await fetchHelper(
      `/searchlanguages?q=${langSearch}`,
      "get"
    );
    const data = await response.json();

    if (data.length === 0) {
      setLanguageNotFound(true);
    } else {
      if (response.status < 400) {
        setLanguageNotFound(false);
        setLanguages((old) => [...old, ...data]);
        const oldLang = movie.languageIds;
        setMovie((old) => ({
          ...old,
          languageIds: [...oldLang, data[0].id],
        }));
        setLangSearch("");
      }
    }
  }

  function onLangClick(id) {
    const newLang = movie.languageIds.filter((lang) => lang !== id);
    setMovie((old) => ({ ...old, languageIds: newLang }));
    setLanguages((old) => old.filter((lang) => lang.id !== id));
  }

  async function onSearchAddLanguageClick() {
    const response = await fetchHelper(`/addLanguages`, "post", {
      language: addLangSearch,
    });
    if (response.status < 400) {
      setAddedLanguage(true);
      setLangSearch("");
    }
  }

  function onKeyDown(key, callback) {
    if (key === "Enter") {
      callback();
    }
  }

  return (
    <label>
      <h3>Välj språk:</h3>
      <div className="name-search-container">
        <div className="name-container">
          <label>
            <span>Sök språk:</span>
            <input
              placeholder="Sök språk"
              onChange={(e) => setLangSearch(e.target.value)}
              value={langSearch}
              onKeyDown={(e) => onKeyDown(e.key, onSearchLanguageClick)}
              maxLength={3}
            />
          </label>
          <button
            className="search-cat-btn"
            onClick={onSearchLanguageClick}
            type="button">
            Sök
          </button>

          {languageNotFound && <p>Språk ej hittat!</p>}
        </div>
        <div className="name-container">
          <label>
            <span>Lägg till nytt språk:</span>
            <input
              placeholder="Lägg till nytt språk"
              onChange={(e) => setAddLangSearch(e.target.value)}
              value={addLangSearch}
              onKeyDown={(e) => onKeyDown(e.key, onSearchAddLanguageClick)}
              maxLength={3}
            />
          </label>
          <button
            className="search-cat-btn"
            onClick={onSearchAddLanguageClick}
            type="button">
            Lägg till
          </button>

          {addedLanguage && <p>Språk har lagts in i databasen</p>}
        </div>
      </div>
      <span>
        <strong>Valda språk</strong>: (Klicka på ett språk för att ta bort det)
      </span>
      {languages.length === 0 && <em>Du har inte valt några språk</em>}
      <ul required>
        {languages.map((language) => (
          <li
            value={language.id}
            key={`language_${language.id}`}
            onClick={() => onLangClick(language.id)}>
            {language.language}
          </li>
        ))}
      </ul>
    </label>
  );
}
