import { addMovieService } from "../service/addMovieService.js";

export async function addMovie(req, res) {
    const {
        title,
        description,
        releaseDate,
        trailerLink,
        durationInMinutes,
        ageLimit,
        directorId,
        categoryIds,
        actorNames,
      } = req.body;
    
      const result = await addMovieService({
        title,
        description,
        releaseDate,
        trailerLink,
        durationInMinutes,
        ageLimit,
        directorId,
        categoryIds,
        actorNames,
      });
    
      if (result.success) {
        res.status(201).json({ message: "Movie har lagts till." });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
}