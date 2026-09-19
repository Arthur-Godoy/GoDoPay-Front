import { authService } from "~/services/http/authService";

export const authMiddleware = async ({ request, context }) => {
  const { data } = await authService.me();
  return data.user ?? "/auth/login";
};
