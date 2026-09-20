import { useCallback, useEffect, useState } from "react";
import { useAccount } from "~/hooks/useAccount";
import { useSnackbar } from "~/hooks/useSnackbar";
import { getErrorMessage } from "~/utils/httpError";

export function useAccountSwitcher({ open, onClose }) {
  const { currentAccount, accounts, isLoadingAccounts, loadAccounts, switchAccount } =
    useAccount();

  const { showSuccess, showError } = useSnackbar();

  const [switchingId, setSwitchingId] = useState(null);

  useEffect(() => {
    if (!open) return;

    setSwitchingId(null);
    loadAccounts().catch((error) => showError(getErrorMessage(error)));
  }, [open, loadAccounts, showError]);

  const selectAccount = useCallback(
    async (accountId) => {
      setSwitchingId(accountId);

      try {
        const data = await switchAccount(accountId);

        showSuccess(`Conta alterada para ${data.current_account.nickname}.`);
        onClose();
      } catch (error) {
        showError(getErrorMessage(error));
      } finally {
        setSwitchingId(null);
      }
    },
    [switchAccount, showSuccess, showError, onClose],
  );

  return {
    accounts,
    currentAccountId: currentAccount?.id,
    isLoadingAccounts,
    switchingId,
    selectAccount,
  };
}
