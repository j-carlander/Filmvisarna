import { runQuery } from "../db.js";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { resizeImage } from "../utils/imageHandler.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

export async function addMovieService({
  title,
  description,
  releaseDate,
  trailerLink,
  durationInMinutes,
  ageLimit,
  directorId,
  categoryIds,
  actorNames,
  base64Img,
}) {
  try {
    const movieInsertQuery = `
      INSERT INTO movies (title, description, releasedate, trailerlink, durationinminutes, agelimit, directorid)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const movieValues = [
      title,
      description,
      releaseDate,
      trailerLink,
      durationInMinutes,
      ageLimit,
      directorId,
    ];
    const { insertId: movieId } = await runQuery(movieInsertQuery, movieValues);

    await saveImage(movieId, base64Img);
    await scaleImage(movieId, getExtensionFromBase64(base64Img));
    await deleteImage(movieId, getExtensionFromBase64(base64Img));

    const categoryInsertQuery = `
      INSERT INTO moviecategories (categoryid, movieid)
      VALUES (?, ?)
    `;
    const categoryValues = categoryIds.map((categoryId) => [
      categoryId,
      movieId,
    ]);
    await Promise.all(
      categoryValues.map((values) => runQuery(categoryInsertQuery, values))
    );

    const actorInsertQuery = `
      INSERT INTO movieactors (movieid, nameid)
      VALUES (?, ?)
    `;
    const actorValues = actorNames.map((nameId) => [movieId, nameId]);
    await Promise.all(
      actorValues.map((values) => runQuery(actorInsertQuery, values))
    );

    return { success: true, message: "Movie added successfully." };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Internal server error" };
  }
}

async function deleteImage(insertId, extension) {
  return new Promise((resolve, reject) => {
    fs.rm(join(__dirname, `${insertId}.${extension}`), (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

async function scaleImage(insertId, extension) {
  return resizeImage(insertId, join(__dirname, `${insertId}.${extension}`));
}

async function saveImage(insertId, base64Img) {
  const promise = new Promise((resolve, reject) => {
    const extension = getExtensionFromBase64(base64Img);
    const filePath = join(__dirname, `${insertId}.${extension}`);

    fs.writeFile(filePath, base64Img.split(",")[1], "base64", (error) => {
      if (error) {
        reject(error);
      } else {
        resolve("The image was saved!");
      }
    });
  });

  return promise;
}

function getExtensionFromBase64(base64Img) {
  return base64Img.substring(
    base64Img.indexOf("/") + 1,
    base64Img.indexOf(";")
  );
}
