/**
 * Util to check for unwanted characters
 * returns true if none is found
 */

export function checkNameForUnwantedChar(name) {
  return /^[^\d!@#$%^&()+={}[\]:;<>,.?/~`|'"-]*$/.test(name);
}

export function checkEmailForUnwantedChar(email) {
  return /^[^!#$%^&()+={}[\]:;<>,?/~`|'"]*$/.test(email);
}
