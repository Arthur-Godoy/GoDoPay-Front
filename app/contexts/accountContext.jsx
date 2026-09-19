import { createContext } from "react";

export const AccountContext = createContext(null);

export function AccountProvider({ children }) {
  const value = {};

  return (
    <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
  );
}
