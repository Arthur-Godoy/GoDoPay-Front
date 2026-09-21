import { Box, Card, Menu, MenuItem, Typography } from "@mui/material";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import IconBadge from "~/components/ui/IconBadge";
import AccountSwitcher from "~/components/home/AccountSwitcher";
import NewAccountDialog from "~/components/home/NewAccountDialog";
import { useAccount } from "~/hooks/useAccount";
import AccountChip from "./AccountChip";
import BalanceActions from "./BalanceActions";
import BalanceAmount from "./BalanceAmount";
import WelcomeMessage from "./WelcomeMessage";
import { useBalanceCard } from "./useBalanceCard";

const HALO_SIZE = 260;

const balanceCardSx = (isNegative) => ({
  background: (theme) =>
    `linear-gradient(145deg, ${theme.palette.background.paper2} 0%, #232725 100%)`,
  "&::after": {
    content: '""',
    position: "absolute",
    top: -90,
    right: -70,
    width: HALO_SIZE,
    height: HALO_SIZE,
    borderRadius: "50%",
    pointerEvents: "none",
    background: isNegative
      ? "radial-gradient(circle, rgba(201,104,94,0.16) 0%, transparent 68%)"
      : "radial-gradient(circle, rgba(123,168,106,0.16) 0%, transparent 68%)",
  },
});

export default function BalanceCard() {
  const { user, currentAccount, isLoading } = useAccount();

  const {
    anchorEl,
    openMenu,
    closeMenu,
    isSwitcherOpen,
    openSwitcher,
    closeSwitcher,
    isNewAccountOpen,
    openNewAccount,
    closeNewAccount,
    isHidden,
    toggleHidden,
  } = useBalanceCard();

  const balance = currentAccount?.balance ?? 0;
  const isNegative = balance < 0;

  return (
    <Card className="relative overflow-hidden" sx={balanceCardSx(isNegative)}>
      <Box className="relative z-[1] p-6">
        <Box className="flex flex-row items-start justify-between">
          <Box className="flex min-w-0 flex-col gap-0">
            <Box className="mb-4 flex min-w-0 flex-col gap-2">
              <WelcomeMessage name={user?.name} isLoading={isLoading} />

              <Typography
                variant="subtitle2"
                color="text.secondary"
                className="leading-tight"
                noWrap
              >
                {currentAccount?.nickname ?? "Conta"}
              </Typography>
            </Box>

            {currentAccount && (
              <AccountChip
                agency={currentAccount.agency}
                number={currentAccount.number}
                digit={currentAccount.digit}
              />
            )}
          </Box>

          <BalanceActions
            isHidden={isHidden}
            onToggleHidden={toggleHidden}
            onOpenMenu={openMenu}
          />
        </Box>

        <Box className="mt-8 flex flex-col gap-2">
          <Box className="flex flex-row items-center gap-2">
            <IconBadge
              icon={isNegative ? TrendingDownIcon : TrendingUpIcon}
              size={22}
              tone={isNegative ? "error" : "success"}
            />
            <Typography
              variant="overline"
              color="text.secondary"
              className="leading-none"
            >
              Saldo disponível
            </Typography>
          </Box>

          <BalanceAmount
            balance={balance}
            isLoading={isLoading}
            isHidden={isHidden}
            isNegative={isNegative}
          />
        </Box>
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={closeMenu}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem onClick={openSwitcher}>
          <SwapHorizIcon fontSize="small" className="mr-3" />
          Trocar de conta
        </MenuItem>

        <MenuItem onClick={openNewAccount}>
          <AddCircleOutlineRoundedIcon fontSize="small" className="mr-3" />
          Criar conta
        </MenuItem>
      </Menu>

      <AccountSwitcher open={isSwitcherOpen} onClose={closeSwitcher} />

      <NewAccountDialog open={isNewAccountOpen} onClose={closeNewAccount} />
    </Card>
  );
}
