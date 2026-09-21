import { Card, Typography } from "@mui/material";
import UndoRoundedIcon from "@mui/icons-material/UndoRounded";
import { formatMoney } from "~/utils/money";
import { formatDateTime } from "~/utils/date";
import ReceiptRow from "./ReceiptRow";
import ReceiptPair from "./ReceiptPair";

export default function RelatedTransaction({ title, transaction }) {
  return (
    <Card
      className="my-2 flex w-full flex-col items-stretch gap-2 rounded-lg p-4 text-left bg-[color:var(--mui-palette-action-selected)]"
    >
      <span className="flex flex-row items-center gap-2">
        <UndoRoundedIcon fontSize="small" color="primary" />
        <Typography variant="subtitle2">{title}</Typography>
      </span>

      <ReceiptPair>
        <ReceiptRow label="Valor" value={formatMoney(transaction.amount)} />
        <ReceiptRow
          label="Data e Hora"
          value={formatDateTime(transaction.created_at)}
        />
      </ReceiptPair>

      <ReceiptRow label="ID" value={transaction.id} mono />
    </Card>
  );
}
