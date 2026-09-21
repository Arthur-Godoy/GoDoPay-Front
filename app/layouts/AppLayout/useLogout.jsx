import { useCallback, useState } from "react";
import { authService } from "~/services/http/authService";
import { clearSession } from "~/services/session";

export function useLogout() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const logout = useCallback(async () => {
    setIsLoggingOut(true);

    try {
      await authService.logout();
    } finally {
      await clearSession();
    }
  }, []);

  return { isLoggingOut, logout };
}
