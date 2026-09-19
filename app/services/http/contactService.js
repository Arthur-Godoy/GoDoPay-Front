import useHttp from "~/hooks/useHttp";

export const contactService = {
  list() {
    return useHttp.get("/contacts");
  },

  create(payload) {
    return useHttp.post("/contacts", payload);
  },
};
