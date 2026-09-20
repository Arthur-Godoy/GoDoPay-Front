import useHttp from "~/hooks/useHttp";

export const transactionService = {
  list(params) {
    return useHttp.get("/transactions", { params });
  },

  show(transactionId) {
    return useHttp.get(`/transactions/${transactionId}`);
  },

  transfer(payload) {
    return useHttp.post("/transfer", payload);
  },

  deposit(payload) {
    return useHttp.post("/deposit", payload);
  },

  revert(transactionId) {
    return useHttp.post(`/return/${transactionId}`);
  },
};
