import { useContext } from "react";
import { TransferContext } from "~/contexts/transfer";

export function useTransfer() {
  const context = useContext(TransferContext);

  if (!context) {
    throw new Error("useTransfer precisa estar dentro de TransferProvider");
  }

  return context;
}
