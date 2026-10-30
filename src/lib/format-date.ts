export function formatDate(value?: string): string {
  if (!value) return "Research";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Research";
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC"
  });
}
