import {
  Box,
  Chip,
  CircularProgress,
  IconButton,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import { formatMoney } from "~/utils/money";
import { formatDateTime } from "~/utils/date";
import { STATUS_CHIP } from "./options";

function accountLabel(account) {
  if (!account) return "—";

  return `${account.nickname} · Ag ${account.agency} · CC ${account.number}-${account.digit}`;
}

export default function SolicitationItem({
  solicitation,
  isSent,
  isPending,
  onApprove,
  onReject,
  onRemove,
}) {
  const chip = STATUS_CHIP[solicitation.status] ?? STATUS_CHIP.pending;
  const counterpart = isSent ? solicitation.approver : solicitation.requester;
  const canAct = solicitation.status === "pending";

  return (
    <TableRow hover>
      <TableCell>
        <Box className="flex flex-col gap-0.5">
          <Typography variant="body2" noWrap>
            {isSent ? "Para" : "De"} {accountLabel(counterpart)}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {formatDateTime(solicitation.created_at)}
          </Typography>
        </Box>
      </TableCell>

      <TableCell align="center">
        <Typography className="text-[15px] font-semibold tabular-nums">
          {formatMoney(solicitation.transaction?.amount)}
        </Typography>
      </TableCell>

      <TableCell align="center">
        <Chip label={chip.label} color={chip.color} size="small" />
      </TableCell>

      <TableCell align="right">
        {!canAct ? null : isPending ? (
          <CircularProgress size={20} />
        ) : isSent ? (
          <Tooltip title="Excluir solicitação">
            <IconButton
              size="small"
              color="error"
              aria-label="Excluir solicitação"
              onClick={() => onRemove(solicitation)}
            >
              <DeleteOutlineRoundedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        ) : (
          <Box className="flex flex-row justify-end gap-1.5">
            <Tooltip title="Reprovar solicitação">
              <IconButton
                size="small"
                aria-label="Reprovar solicitação"
                onClick={() => onReject(solicitation)}
                sx={{
                  bgcolor: "error.main",
                  color: "error.contrastText",
                  "&:hover": { bgcolor: "error.dark" },
                }}
              >
                <CloseRoundedIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Aprovar devolução">
              <IconButton
                size="small"
                aria-label="Aprovar devolução"
                onClick={() => onApprove(solicitation)}
                sx={{
                  bgcolor: "success.main",
                  color: "success.contrastText",
                  "&:hover": { bgcolor: "success.dark" },
                }}
              >
                <CheckRoundedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        )}
      </TableCell>
    </TableRow>
  );
}
