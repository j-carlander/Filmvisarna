export function formatDateTimeSwe(datetime) {
  let formatedDate = new Intl.DateTimeFormat("sv-SE", {
    weekday: "long",
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "numeric",
  }).format(datetime);

  formatedDate = formatedDate.slice(0, 1).toUpperCase() + formatedDate.slice(1);
  formatedDate = formatedDate.replace(". ", ". kl: ");

  return formatedDate;
}
