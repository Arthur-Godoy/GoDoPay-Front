import { useCallback, useMemo, useState } from "react";
import TransactionReceipt from "~/components/home/TransactionReceipt";
import { ReceiptContext } from "./receipt";

export function ReceiptProvider({ children }) {
  const [transaction, setTransaction] = useState(null);

  const openReceipt = useCallback((selected) => setTransaction(selected), []);

  const closeReceipt = useCallback(() => setTransaction(null), []);

  const value = useMemo(
    () => ({ openReceipt, closeReceipt }),
    [openReceipt, closeReceipt],
  );

  return (
    <ReceiptContext.Provider value={value}>
      {children}

      <TransactionReceipt
        transaction={transaction}
        open={Boolean(transaction)}
        onClose={closeReceipt}
      />
    </ReceiptContext.Provider>
  );
}
