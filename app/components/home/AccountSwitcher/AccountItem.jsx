import { Box, CircularProgress, ListItemButton, Typography } from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import IconBadge from "~/components/ui/IconBadge";
import { formatMoney } from "~/utils/money";

export default function AccountItem({
  account,
  isActive,
  isSwitching,
  onSelect,
}) {
  return (
    <ListItemButton
      onClick={() => onSelect(account.id)}
      disabled={isSwitching || isActive}
      className={`flex flex-row items-center gap-4 border-l-[3px] border-solid px-6 py-3.5 [&.Mui-disabled]:opacity-100 ${
        isActive
          ? "border-[color:var(--mui-palette-primary-light)] bg-[rgba(182,139,75,0.22)]"
          : "border-transparent bg-transparent"
      }`}
    >
      <IconBadge
        icon={AccountBalanceWalletRoundedIcon}
        tone={isActive ? "primary" : "neutral"}
      />

      <Box className="flex min-w-0 flex-1 flex-col gap-0.5">
        <Typography
          variant="body2"
          noWrap
          className={isActive ? "font-semibold" : undefined}
          sx={isActive ? { color: "primary.light" } : undefined}
        >
          {account.nickname}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Ag {account.agency} · CC {account.number}-{account.digit}
        </Typography>
      </Box>

      <Typography
        variant="subtitle2"
        className={`leading-snug tabular-nums ${isActive ? "font-semibold" : ""}`}
        sx={isActive ? { color: "primary.light" } : undefined}
      >
        {formatMoney(account.balance)}
      </Typography>

      {isSwitching ? (
        <CircularProgress size={20} />
      ) : (
        isActive && (
          <CheckCircleRoundedIcon
            className="block"
            sx={{ color: "primary.light" }}
          />
        )
      )}
    </ListItemButton>
  );
}
