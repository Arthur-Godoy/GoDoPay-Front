import { useCallback, useMemo, useState } from "react";
import { transactionService } from "~/services/http/transactionService";
import { useAccount } from "~/hooks/useAccount";
import { useReceipt } from "~/hooks/useReceipt";
import { unwrapData } from "~/utils/apiResponse";
import { STEPS, TransferContext } from "./transfer";
import TransferDialog from "~/components/home/TransferDialog";

const INITIAL_STATE = {
  step: STEPS.Contacts,
  contact: null,
  amount: 0,
};

export function TransferProvider({ children }) {
  const { currentAccount, loadUser } = useAccount();
  const { openReceipt } = useReceipt();
  const [isOpen, setIsOpen] = useState(false);
  const [transfer, setTransfer] = useState(INITIAL_STATE);
  const [isSending, setIsSending] = useState(false);

  const openTransfer = useCallback(() => {
    setTransfer(INITIAL_STATE);
    setIsOpen(true);
  }, []);

  const closeTransfer = useCallback(() => setIsOpen(false), []);

  const selectContact = useCallback((contact) => {
    setTransfer((previous) => ({
      ...previous,
      contact,
      step: STEPS.Amount,
    }));
  }, []);

  const confirmAmount = useCallback((amount) => {
    setTransfer((previous) => ({
      ...previous,
      amount,
      step: STEPS.Confirmation,
    }));
  }, []);

  const backToContacts = useCallback(() => {
    setTransfer((previous) => ({ ...previous, step: STEPS.Contacts }));
  }, []);

  const backToAmount = useCallback(() => {
    setTransfer((previous) => ({ ...previous, step: STEPS.Amount }));
  }, []);

  const sendTransfer = useCallback(async () => {
    setIsSending(true);

    try {
      const { data } = await transactionService.transfer({
        type: "transfer",
        account_payer_id: currentAccount.id,
        contact_id: transfer.contact.id,
        amount: transfer.amount,
      });

      setIsOpen(false);
      openReceipt(unwrapData(data));

      await loadUser();
    } catch {
      setIsSending(false);
    } finally {
      setIsSending(false);
    }
  }, [currentAccount, transfer, openReceipt, loadUser]);

  const value = useMemo(
    () => ({ openTransfer }),
    [openTransfer],
  );

  return (
    <TransferContext.Provider value={value}>
      {children}

      <TransferDialog
        open={isOpen}
        step={transfer.step}
        contact={transfer.contact}
        amount={transfer.amount}
        isSending={isSending}
        onClose={closeTransfer}
        onSelectContact={selectContact}
        onConfirmAmount={confirmAmount}
        onBackToContacts={backToContacts}
        onBackToAmount={backToAmount}
        onSend={sendTransfer}
      />
    </TransferContext.Provider>
  );
}
