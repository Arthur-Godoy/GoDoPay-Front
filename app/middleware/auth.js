import { redirect } from "react-router";
import { tokenStorage } from "~/services/tokenStorage";

export const authMiddleware = async () => {
  if (!tokenStorage.getAccessToken()) {
    throw redirect("/login");
  }
};
