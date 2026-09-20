import { Skeleton, Typography } from "@mui/material";
import { formatMoney } from "~/utils/money";

const HIDDEN_MASK = "••••••";

export default function BalanceAmount({ balance, isLoading, isHidden, isNegative }) {
  if (isLoading) {
    return <Skeleton variant="text" width={280} height={72} />;
  }

  return (
    <Typography
      className="text-[38px] font-bold leading-[1.05] tracking-tighter tabular-nums sm:text-[48px]"
      sx={{ color: isNegative ? "error.main" : "success.main" }}
    >
      {isHidden ? HIDDEN_MASK : formatMoney(balance)}
    </Typography>
  );
}
