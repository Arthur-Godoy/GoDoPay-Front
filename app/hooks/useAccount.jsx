import { useContext } from "react";
import { AccountContext } from "~/contexts/accountContext";

export function useAccount() {
  const context = useContext(AccountContext);

  if (!context) {
    throw new Error("useAccount precisa estar dentro de AccountProvider");
  }

  return context;
}
