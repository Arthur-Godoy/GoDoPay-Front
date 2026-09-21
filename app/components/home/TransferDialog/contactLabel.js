export function contactName(contact) {
  const person = contact?.account?.user?.name ?? "Contato";
  const nickname = contact?.account?.nickname;

  return nickname ? `${person} · ${nickname}` : person;
}

export function contactAccount(contact) {
  const account = contact?.account ?? contact ?? {};

  return `Ag ${account.agency} · CC ${account.number}-${account.digit}`;
}
