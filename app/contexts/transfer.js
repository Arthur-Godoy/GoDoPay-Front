import { createContext } from "react";

export const TransferContext = createContext(null);

export const STEPS = {
  Contacts: "contacts",
  Amount: "amount",
  Confirmation: "confirmation",
};
