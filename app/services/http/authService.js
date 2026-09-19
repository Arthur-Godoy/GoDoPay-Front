import useHttp from "~/hooks/useHttp";

export const authService = {
  register(payload) {
    return useHttp.post("/register", payload);
  },

  login(payload) {
    return useHttp.post("/login", payload);
  },

  refresh() {
    return useHttp.post("/refresh");
  },

  me() {
    return useHttp.get("/me");
  },

  logout() {
    return useHttp.post("/logout");
  },

  switchAccount(accountId) {
    return useHttp.patch(`/switch-account/${accountId}`);
  },
};
