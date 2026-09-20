export function buildLabel(transaction, isIncoming, isRefund) {
  if (transaction.type === "deposit") return "Depósito";

  const counterpart = isIncoming
    ? transaction.account_payer
    : transaction.account_receiver;

  const action = isRefund
    ? isIncoming
      ? "Estorno recebido"
      : "Estorno enviado"
    : isIncoming
      ? "Transferência recebida"
      : "Transferência enviada";

  return counterpart?.nickname ? `${action} · ${counterpart.nickname}` : action;
}
