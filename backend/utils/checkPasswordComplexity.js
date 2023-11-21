/**
 * Util for checking the complexity of a password.
 *
 * The password must be at least 8 characters long and fulfill 3 out of 4 other cases
 * which are:
 *
 * 1. Contain an upper case character.
 * 2. Contain a lower case character.
 * 3. Contain a special character.
 * 4. Contain a digit.
 *
 * returns true if complex and false if not.
 */

export function isPasswordComplex(password) {
  const isLongEnough = password.length >= 8;

  const includesUpperCase = /[A-Z]/.test(password);

  const includesLowerCase = /[a-z]/.test(password);

  const includesSpecialCharacter = /[-+_!@#$%^&*.,?]/.test(password);

  const includesDigit = /\d/.test(password);

  const regexPasses = [
    includesUpperCase,
    includesLowerCase,
    includesSpecialCharacter,
    includesDigit,
  ].filter((value) => value);

  return isLongEnough && regexPasses.length >= 3;
}
