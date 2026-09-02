export function formatDate(date) {
  const d =
    date instanceof Date
      ? date
      : new Date(
          typeof date === "string" && !date.includes("T")
            ? `${date}T00:00:00`
            : date
        );
  if (!Number.isNaN(d.getTime())) {
    return d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }
  return String(date);
}

export function dateValue(date) {
  if (date instanceof Date) return date.getTime();
  if (typeof date === "string") {
    const d = new Date(
      date.includes("T") ? date : `${date}T00:00:00`
    );
    return Number.isNaN(d.getTime()) ? 0 : d.getTime();
  }
  return Number(date) || 0;
}
