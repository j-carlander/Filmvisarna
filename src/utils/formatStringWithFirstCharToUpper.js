/**
 * Util for making the first character in a string upper case.
 */

export function formatStringWithFirstCharToUpper(string) {
  return string.slice(0, 1).toUpperCase() + string.slice(1);
}
