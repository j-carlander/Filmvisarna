/**
 * Component for adding categories to a new movie
 * onRemoveCategory removes a category from the list
* fetchAddCategory adds a new category to the database and the list
 * onSearchCategoryClick searches for categories using input
 */

import { useState } from "react";
import { fetchHelper } from "../../utils/fetchHelper";

export default function AdminCategories({
  movie,
  setMovie,
  categories,
  setCategories,
}) {
  const [catSearch, setCatSearch] = useState("");
  const [addCat, setAddCat] = useState(false);

  function onRemoveCategory(id) {
    const filteredCats = movie.categoryIds.filter((cat) => cat !== id);
    setMovie((old) => ({ ...old, categoryIds: [...filteredCats] }));
    setCategories((old) => old.filter((cat) => cat.id !== id));
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

  function onKeyDown(key, callback) {
    if (key === "Enter") {
      callback();
    }
  }

  return (
    <label>
      <h3>Välj kategorier:</h3>
      <span>Sök en kategori:</span>
      <input
        placeholder="Sök kategori"
        onChange={(e) => setCatSearch(e.target.value)}
        onKeyDown={(e) => onKeyDown(e.key, onSearchCategoryClick)}
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
      <span>
        <strong>Valda kategorier</strong>: (Klicka på en kategori för att ta
        bort den)
      </span>
      {categories.length === 0 && <em>Inga kategorier har lagts till!</em>}
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
  );
}
