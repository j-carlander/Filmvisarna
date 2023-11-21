/**
 * Util for generating a random booking number.
 *
 * Booking number example: XP341A
 */

function randomLetter() {
  return String.fromCharCode(Math.ceil(Math.random() * (90 - 65) + 65));
}
function randomThreeDigitNumberAsString() {
  return Math.ceil(Math.random() * 899 + 100).toString();
}

export function generateBookingNumber() {
  const string =
    randomLetter() +
    randomLetter() +
    randomThreeDigitNumberAsString() +
    randomLetter();

  return string;
}
