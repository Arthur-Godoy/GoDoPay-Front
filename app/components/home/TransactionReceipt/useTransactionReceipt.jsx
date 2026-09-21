import { useCallback, useEffect, useState } from "react";
import { transactionService } from "~/services/http/transactionService";
import { useAccount } from "~/hooks/useAccount";
import { useSnackbar } from "~/hooks/useSnackbar";

export function useTransactionReceipt({ transaction, open, onClose }) {
  const { currentAccount, loadUser } = useAccount();
  const { showSuccess } = useSnackbar();

  const [selected, setSelected] = useState(null);
  const [detail, setDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isReverting, setIsReverting] = useState(false);

  useEffect(() => {
    if (!open || !transaction) return;

    setSelected(transaction);
  }, [open, transaction]);

  function openRelated(transaction) {
    setSelected(transaction);
  }

  useEffect(() => {
    if (!selected) return;

    let isCurrent = true;

    setIsLoading(true);

    transactionService
      .show(selected.id)
      .then(({ data }) => {
        if (isCurrent) setDetail(data);
      })
      .catch(() => {})
      .finally(() => {
        if (isCurrent) setIsLoading(false);
      });

    return () => {
      isCurrent = false;
    };
  }, [selected]);

  const revert = useCallback(async () => {
    setIsReverting(true);

    try {
      await transactionService.revert(selected.id);

      onClose();
      showSuccess("Transação devolvida com sucesso.");

      await loadUser();
    } catch {
      setIsReverting(false);
    } finally {
      setIsReverting(false);
    }
  }, [selected, onClose, showSuccess, loadUser]);

  const isDetailLoaded = Boolean(detail) && detail.id === selected?.id;

  return {
    transaction: isDetailLoaded ? detail : selected,
    accountId: currentAccount?.id,
    isLoading: isLoading && !isDetailLoaded,
    isReverting,
    revert,
    openRelated
  };
}
