/**
 * Component for adding actors to a new movie
 * onActorClick removes an actor from the list
 * handleAddActors adds an actor to the list
 */

import { AdminFetchingNames } from "../AdminFetchingNames/AdminFetchingNames";

export default function AdminActors({
  names,
  setNames,
  movie,
  setMovie,
  handleChange,
}) {
  function onActorClick(id) {
    setNames((old) => old.filter((nameObject) => nameObject.id !== id));
    const filteredActors = movie.actorNames.filter((actorId) => actorId !== id);
    setMovie((old) => ({ ...old, actorNames: filteredActors }));
  }

  function handleAddActors(nameObject) {
    const oldActorids = movie.actorNames;
    setNames((old) => [...old, nameObject]);
    setMovie((movie) => ({
      ...movie,
      actorNames: [...oldActorids, nameObject.id],
    }));
  }
  return (
    <label>
      <h3>Välj skådespelare:</h3>
      <AdminFetchingNames onSetName={handleAddActors} />
      <span>
        <strong>Valda namn</strong>: (Klicka på ett namn för att ta bort det)
      </span>
      {names.length === 0 && <em>Du har inte lagt till några skådespelare</em>}
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
  );
}
