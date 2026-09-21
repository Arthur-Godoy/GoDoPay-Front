import { Box, Typography } from "@mui/material";
import SavingsRoundedIcon from "@mui/icons-material/SavingsRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import CallReceivedRoundedIcon from "@mui/icons-material/CallReceivedRounded";
import UndoRoundedIcon from "@mui/icons-material/UndoRounded";
import IconBadge from "~/components/ui/IconBadge";
import ReturnedChip from "~/components/home/TransactionRow/ReturnedChip";
import { buildLabel } from "~/components/home/TransactionRow/buildLabel";
import { formatMoney } from "~/utils/money";
import { formatDateTime } from "~/utils/date";

function resolveIcon({ transaction, isIncoming, isRefund }) {
  if (isRefund) return UndoRoundedIcon;

  if (transaction.type === "deposit") {
    return SavingsRoundedIcon;
  }

  return isIncoming ? CallReceivedRoundedIcon : SendRoundedIcon;
}

export function buildColumns(accountId) {
  return [
    {
      field: "type",
      headerName: "Transação",
      align: "left",
      sortable: false,
      render: (row) => {
        const isIncoming = row.account_receiver_id === accountId;
        const isRefund = Boolean(row.return_of_transaction_id);

        return (
          <Box className="flex w-full min-w-0 flex-row items-center gap-3">
            <IconBadge
              icon={resolveIcon({ transaction: row, isIncoming, isRefund })}
              size={38}
              tone={isRefund ? "primary" : isIncoming ? "success" : "error"}
            />

            <Box className="flex min-w-0 flex-row items-center gap-2">
              <Typography
                variant="body2"
                noWrap
                className={isRefund ? "font-semibold" : undefined}
                sx={isRefund ? { color: "primary.light" } : undefined}
              >
                {buildLabel(row, isIncoming, isRefund)}
              </Typography>

              {row.was_returned && <ReturnedChip />}
            </Box>
          </Box>
        );
      },
    },
    {
      field: "created_at",
      headerName: "Data",
      align: "center",
      sortable: true,
      render: (row) => (
        <Typography variant="body2" color="text.secondary">
          {formatDateTime(row.created_at)}
        </Typography>
      ),
    },
    {
      field: "amount",
      headerName: "Valor",
      align: "right",
      headerAlign: "right",
      sortable: true,
      render: (row) => {
        const isIncoming = row.account_receiver_id === accountId;

        return (
          <Typography
            className="text-[15px] font-semibold tabular-nums"
            sx={{ color: isIncoming ? "success.main" : "error.main" }}
          >
            {isIncoming ? "+" : "−"} {formatMoney(row.amount)}
          </Typography>
        );
      },
    },
  ];
}
