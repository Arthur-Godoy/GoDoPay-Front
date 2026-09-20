export function accountLabel(account) {
  if (!account) return "—";

  return `${account.nickname} · Ag ${account.agency} · CC ${account.number}-${account.digit}`;
}
