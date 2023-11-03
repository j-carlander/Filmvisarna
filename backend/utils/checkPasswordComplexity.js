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
