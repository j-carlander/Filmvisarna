/**
 * Util for scaling the image sent in add movie route into different sizes.
 *
 * Example use:
 *
 * resizeImage(31, join(__dirname, "image.jpg"));
 *
 * (id of the movie, full path to the image file to resize)
 */

import { dirname, join } from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));

const destinationFolder = join(__dirname, "..", "..", "public/images");

const settings = {
  quality: 70,
  sizes: [
    { width: 200, height: 300 },
    { width: 400, height: 600 },
    { width: 1400, height: 700 },
  ],
};

export async function resizeImage(insertId, fileToResize) {
  const sharpImage = sharp(fileToResize);

  for (let i = 0; i < settings.sizes.length; i++) {
    let width = settings.sizes[i].width;
    let height = settings.sizes[i].height;
    await sharpImage
      .resize({ width, height, quality: settings.quality })
      .webp()
      .toFile(join(destinationFolder, `${insertId}_w${width}.webp`));
  }
}
