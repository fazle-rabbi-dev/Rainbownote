export function formatDate(inputDate) {
  const options = {
    day: "numeric",
    month: "short",
    year: "2-digit",
    hour: "numeric",
    minute: "numeric",
    hour12: true
  };
  const formattedDate = new Date(inputDate).toLocaleDateString(
    "en-US",
    options
  );

  return formattedDate.replace(/,(\s\d{1,2}:)/, '$1');
}
