/**
 * Util for formatting the age text in movies page.
 */

export function ageLimitFormatter(ageLimit) {
  if (ageLimit === 0) return "Barn";
  return `${ageLimit} +`;
}
