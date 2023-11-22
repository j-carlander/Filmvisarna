/**
 * Add movie page is for the administrator to add a new movie to the database.
 */

import { useState } from "react";
import { fetchHelper } from "../../utils/fetchHelper";
import { AddMovieModal } from "../../components/AddMovieModal/AddMovieModal";
import AdminInput from "../../components/AdminAddMovie/AdminInput";
import AdminActors from "../../components/AdminAddMovie/AdminActors";
import AdminDirector from "../../components/AdminAddMovie/AdminDirector";
import AdminLanguages from "../../components/AdminAddMovie/AdminLanguages";
import AdminCategories from "../../components/AdminAddMovie/AdminCategories";
import AdminImage from "../../components/AdminAddMovie/AdminImage";
import { AdminPageBackBtn } from "../../components/AdminPageBackBtn/AdminPageBackBtn";

const movieSetup = {
  title: "",
  description: "",
  trailerLink: "",
  durationInMinutes: 0,
  ageLimit: 0,
  directorId: 0,
  releaseDate: "",
  languageIds: [],
  categoryIds: [],
  actorNames: [],
  base64Img: "",
};

export function AdminAddMoviePage() {
  const [movie, setMovie] = useState(movieSetup);
  const [names, setNames] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [director, setDirector] = useState(undefined);
  const [modalOpen, setModalOpen] = useState(false);

  function handleChange(e) {
    setMovie((movie) => ({ ...movie, [e.target.name]: e.target.value }));
  }

  async function onSubmitMovie() {
    const resp = await fetchHelper("/addmovie", "post", movie);

    if (resp.status < 400) {
      setModalOpen(true);
    }
  }

  return (
    <article className="admin-add-movie-page-wrapper">
      <AdminPageBackBtn text={`Tillbaka till filmer`} />
      <h2>Lägg till en ny film</h2>
      <form className="new-movie-form" onSubmit={(e) => e.preventDefault()}>
        <div className="grid-column">
          <AdminInput
            {...{
              name: "title",
              type: "text",
              spanText: "Filmtitel",
              value: movie.title,
              handleChange,
            }}
          />
          <label>
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
          <AdminInput
            {...{
              name: "trailerLink",
              type: "text",
              spanText: "Länk till trailer",
              value: movie.trailerLink,
              handleChange,
            }}
          />
          <div className="length-and-age-container">
            <AdminInput
              {...{
                name: "durationInMinutes",
                type: "number",
                spanText: "Filmlängd i minuter",
                value: movie.durationInMinutes,
                handleChange,
              }}
            />
            <label>
              <span>Åldersgräns:</span>
              <select
                name="ageLimit"
                required
                onChange={handleChange}
                value={movie.ageLimit}>
                <option value={0}>Barntillåtet</option>
                <option value={7}>7 +</option>
                <option value={11}>11 +</option>
                <option value={15}>15 +</option>
              </select>
            </label>
            <AdminInput
              {...{
                name: "releaseDate",
                type: "date",
                spanText: "Premiärdatum",
                value: movie.releaseDate,
                handleChange,
              }}
            />
          </div>
        </div>
        <div className="grid-column second-column">
          <AdminDirector {...{ director, setDirector, setMovie }} />
          <AdminActors
            {...{ names, setNames, movie, setMovie, handleChange }}
          />
          <AdminLanguages
            {...{
              languages,
              setLanguages,
              movie,
              setMovie,
            }}
          />
          <AdminCategories
            {...{
              movie,
              setMovie,
              categories,
              setCategories,
            }}
          />
          <AdminImage {...{ movie, setMovie }} />
        </div>
        <button className="add-movie-btn" type="button" onClick={onSubmitMovie}>
          Lägg till film!
        </button>
      </form>
      <AddMovieModal {...{ modalOpen, setModalOpen }} />
    </article>
  );
}
