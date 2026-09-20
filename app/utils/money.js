const CENTS_IN_UNIT = 100;

const formatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export function formatMoney(cents) {
  return formatter.format((cents ?? 0) / CENTS_IN_UNIT);
}

export function parseMoney(value) {
  const digits = String(value ?? "").replace(/\D/g, "");

  return digits === "" ? 0 : Number(digits);
}
