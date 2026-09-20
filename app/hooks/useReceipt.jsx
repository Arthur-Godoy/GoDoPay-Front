import { useContext } from "react";
import { ReceiptContext } from "~/contexts/receiptContext";

export function useReceipt() {
  const context = useContext(ReceiptContext);

  if (!context) {
    throw new Error("useReceipt precisa estar dentro de ReceiptProvider");
  }

  return context;
}
