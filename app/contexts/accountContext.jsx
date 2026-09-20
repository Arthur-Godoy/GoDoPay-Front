import { createContext, useCallback, useEffect, useState } from "react";
import { accountService } from "~/services/http/accountService";
import { authService } from "~/services/http/authService";
import { sessionStorage } from "~/services/sessionStorage";
import { unwrapData } from "~/utils/apiResponse";

export const AccountContext = createContext(null);

function unwrapAccounts(data) {
  const accounts = unwrapData(data);

  return Array.isArray(accounts) ? accounts : [];
}

export function AccountProvider({ children }) {
  const storedUser = sessionStorage.getUser();

  const [user, setUser] = useState(storedUser);
  const [currentAccount, setCurrentAccount] = useState(
    storedUser?.current_account ?? null,
  );
  const [isLoading, setIsLoading] = useState(!storedUser);
  const [accounts, setAccounts] = useState([]);
  const [isLoadingAccounts, setIsLoadingAccounts] = useState(false);
  const [accountVersion, setAccountVersion] = useState(0);

  const applyUser = useCallback((data) => {
    setUser(data);
    setCurrentAccount(data.current_account);
    setAccountVersion((previous) => previous + 1);
    sessionStorage.setUser(data);

    return data;
  }, []);

  const loadUser = useCallback(async () => {
    setIsLoading(true);

    try {
      const { data } = await authService.me();

      return applyUser(data);
    } finally {
      setIsLoading(false);
    }
  }, [applyUser]);

  useEffect(() => {
    if (storedUser) return;

    loadUser();
  }, []);

  const loadAccounts = useCallback(async () => {
    setIsLoadingAccounts(true);

    try {
      const { data } = await accountService.list();

      setAccounts(unwrapAccounts(data));
    } finally {
      setIsLoadingAccounts(false);
    }
  }, []);

  const switchAccount = useCallback(
    async (accountId) => {
      const { data } = await authService.switchAccount(accountId);

      return applyUser(data);
    },
    [applyUser],
  );

  const value = {
    user,
    currentAccount,
    accountVersion,
    accounts,
    isLoading,
    isLoadingAccounts,
    loadUser,
    loadAccounts,
    switchAccount,
  };

  return (
    <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
  );
}

