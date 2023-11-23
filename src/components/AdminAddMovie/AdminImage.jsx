/**
 * Component for adding an image to a new movie
 * handleFiles converts image into base64 and adds it to the movie
 */

export default function AdminImage({ movie, setMovie }) {
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

  return (
    <>
      <div className="img-file-container">
        <label htmlFor="imgFile">Välj filmomslag:</label>
        <input
          id="imgFile"
          type="file"
          hidden
          required
          onChange={handleFiles}
        />
      </div>
      {movie.base64Img ? (
        <>
          <p>Vald bild:</p>
          <img src={movie.base64Img} width={200} />
        </>
      ) : (
        <p>Ingen bild är vald!</p>
      )}
    </>
  );
}
