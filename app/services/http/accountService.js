import useHttp from "~/hooks/useHttp";

export const accountService = {
  list() {
    return useHttp.get("/accounts");
  },

  create(payload) {
    return useHttp.post("/account/create", payload);
  },

  deposit(accountId, payload) {
    return useHttp.post(`/deposit/${accountId}`, payload);
  },
};
