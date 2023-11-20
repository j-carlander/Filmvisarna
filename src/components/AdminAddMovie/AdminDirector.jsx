import { AdminFetchingNames } from "../AdminFetchingNames/AdminFetchingNames";

export default function AdminDirector({ director, setDirector, setMovie }) {
  function handleSetDirector(nameObject) {
    setDirector(nameObject.name);
    setMovie((movie) => ({ ...movie, directorId: nameObject.id }));
  }

  return (
    <label>
      <h3>Välj regissör:</h3>
      <AdminFetchingNames onSetName={handleSetDirector} />
      <span>
        <strong>Vald regissör</strong>:
      </span>
      {director || <em>Ingen regissör är vald!</em>}
    </label>
  );
}
