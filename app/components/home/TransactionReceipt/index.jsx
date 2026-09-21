import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import UndoRoundedIcon from "@mui/icons-material/UndoRounded";
import Logo from "~/components/ui/Logo";
import { formatDate, formatTime } from "~/utils/date";
import ReceiptRow from "./ReceiptRow";
import ReceiptPair from "./ReceiptPair";
import ReceiptSummary from "./ReceiptSummary";
import ReceiptSkeleton from "./ReceiptSkeleton";
import RelatedTransaction from "./RelatedTransaction";
import { accountLabel } from "./accountLabel";
import { useTransactionReceipt } from "./useTransactionReceipt";

const TYPE_LABEL = {
  deposit: "Depósito",
  transfer: "Transferência",
};

export default function TransactionReceipt({
  transaction: selectedTransaction,
  open,
  onClose,
}) {
  const {
    transaction,
    accountId,
    isLoading,
    isReverting,
    revert,
    openRelated,
  } = useTransactionReceipt({
    transaction: selectedTransaction,
    open,
    onClose,
  });

  const isIncoming = transaction?.account_receiver_id === accountId;
  const isRefund = Boolean(transaction?.return_of_transaction_id);
  const wasReturned = Boolean(transaction?.was_returned);

  const canRevert =
    Boolean(transaction) &&
    transaction.type === "transfer" &&
    isIncoming
    !isRefund &&
    !wasReturned;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <Box className="flex flex-row items-center justify-between gap-4 px-6 py-2">
        <Logo variant="short" height={58} />

        <IconButton
          size="small"
          onClick={onClose}
          aria-label="Fechar"
          className="mt-2"
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      <Divider />

      {isLoading || !transaction ? (
        <ReceiptSkeleton />
      ) : (
        <>
          <DialogContent className="px-6 pb-1">
            <ReceiptSummary
              amount={transaction.amount}
              isIncoming={isIncoming}
              isRefund={isRefund}
              wasReturned={wasReturned}
            />

            <Divider />

            <Box className="flex flex-col gap-4 py-5">
              <ReceiptRow
                label="Tipo"
                value={TYPE_LABEL[transaction.type] ?? transaction.type}
              />

              <ReceiptPair>
                <ReceiptRow
                  label="Data"
                  value={formatDate(transaction.created_at)}
                />
                <ReceiptRow
                  label="Hora"
                  value={formatTime(transaction.created_at)}
                />
              </ReceiptPair>

              <ReceiptRow
                label="De"
                value={accountLabel(transaction.account_payer)}
              />

              <ReceiptRow
                label="Para"
                value={accountLabel(transaction.account_receiver)}
              />

              <ReceiptRow label="ID da transação" value={transaction.id} mono />
            </Box>

            {transaction.return_of_transaction && (
              <RelatedTransaction
                title="Estorno da transação"
                transaction={transaction.return_of_transaction}
                onOpen={openRelated}
              />
            )}

            {transaction.is_returned_by_transaction && (
              <RelatedTransaction
                title="Estornada por"
                transaction={transaction.is_returned_by_transaction}
                onOpen={openRelated}
              />
            )}

            {canRevert && (
              <Button
                fullWidth
                variant="outlined"
                color="primary"
                disabled={isReverting}
                onClick={revert}
                startIcon={
                  isReverting ? (
                    <CircularProgress size={16} color="inherit" />
                  ) : (
                    <UndoRoundedIcon />
                  )
                }
              >
                Devolver transação
              </Button>
            )}

            <Divider className="mt-4" />

            <Box className="pb-2 pt-1 text-center">
              <Typography variant="caption" color="gray">
                Documento gerado pelo GoDoPay
              </Typography>
            </Box>
          </DialogContent>
        </>
      )}
    </Dialog>
  );
}
