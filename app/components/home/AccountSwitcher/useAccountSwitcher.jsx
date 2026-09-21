import { useCallback, useEffect, useState } from "react";
import { useAccount } from "~/hooks/useAccount";
import { useSnackbar } from "~/hooks/useSnackbar";

export function useAccountSwitcher({ open, onClose }) {
  const { currentAccount, accounts, isLoadingAccounts, loadAccounts, switchAccount } =
    useAccount();

  const { showSuccess } = useSnackbar();

  const [switchingId, setSwitchingId] = useState(null);

  useEffect(() => {
    if (!open) return;

    setSwitchingId(null);
    loadAccounts().catch(() => {});
  }, [open, loadAccounts]);

  const selectAccount = useCallback(
    async (accountId) => {
      setSwitchingId(accountId);

      try {
        const data = await switchAccount(accountId);

        showSuccess(`Conta alterada para ${data.current_account.nickname}.`);
        onClose();
      } catch {
        setSwitchingId(null);
      } finally {
        setSwitchingId(null);
      }
    },
    [switchAccount, showSuccess, onClose],
  );

  return {
    accounts,
    currentAccountId: currentAccount?.id,
    isLoadingAccounts,
    switchingId,
    selectAccount,
  };
}
