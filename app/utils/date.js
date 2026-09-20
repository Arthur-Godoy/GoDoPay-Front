const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

const timeFormatter = new Intl.DateTimeFormat("pt-BR", {
  hour: "2-digit",
  minute: "2-digit",
});

const dateTimeFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

export function formatDate(value) {
  if (!value) return "";

  return dateFormatter.format(new Date(value));
}

export function formatTime(value) {
  if (!value) return "";

  return timeFormatter.format(new Date(value));
}

export function formatDateTime(value) {
  if (!value) return "";

  return dateTimeFormatter.format(new Date(value));
}
