import { sessionStorage } from "~/services/sessionStorage";
import { tokenStorage } from "~/services/tokenStorage";

export async function clearSession() {
  tokenStorage.clear();
  sessionStorage.clear();

  const { router } = await import("~/routes");

  return router.navigate("/login");
}
