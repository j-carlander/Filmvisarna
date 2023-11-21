/**
 * Util for formatting the movie duration to "(hours)t (minutes)m"
 */

export function movieLengthFormatter(durationinminutes) {
  const hours = Math.floor(durationinminutes / 60);
  const minutes = durationinminutes % 60;

  return `${hours === 0 ? "" : `${hours}t `}${
    minutes === 0 ? "" : `${minutes}m`
  }`;
}
