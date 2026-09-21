import { useContext } from "react";
import { AccountContext } from "~/contexts/account";

export function useAccount() {
  const context = useContext(AccountContext);

  if (!context) {
    throw new Error("useAccount precisa estar dentro de AccountProvider");
  }

  return context;
}
