import { Box, Chip, Typography } from "@mui/material";
import { formatMoney } from "~/utils/money";

export default function ReceiptSummary({ amount, isIncoming, isRefund, wasReturned }) {
  return (
    <Box className="flex flex-col items-center gap-2 pb-5">
      <Typography variant="overline" color="text.secondary">
        Comprovante
      </Typography>

      <Typography
        className="text-[40px] font-bold leading-tight tracking-tight tabular-nums"
        sx={{ color: isIncoming ? "success.main" : "error.main" }}
      >
        {isIncoming ? "+" : "−"} {formatMoney(amount)}
      </Typography>

      <Box className="flex flex-row gap-2">
        {isRefund && <Chip label="Estorno" size="small" color="primary" />}

        {wasReturned && (
          <Chip
            label="Estornada"
            size="small"
            color="error"
            variant="outlined"
          />
        )}
      </Box>
    </Box>
  );
}
