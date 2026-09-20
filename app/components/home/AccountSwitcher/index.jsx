import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AccountItem from "./AccountItem";
import LoadingAccounts from "./LoadingAccounts";
import { useAccountSwitcher } from "./useAccountSwitcher";

export default function AccountSwitcher({ open, onClose }) {
  const {
    accounts,
    currentAccountId,
    isLoadingAccounts,
    switchingId,
    selectAccount,
  } = useAccountSwitcher({ open, onClose });

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle className="flex flex-row items-center justify-between gap-4 pb-3">
        Suas contas
        <IconButton size="small" onClick={onClose} aria-label="Fechar">
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <DialogContent className="px-0 pb-4">
        {isLoadingAccounts ? (
          <LoadingAccounts />
        ) : accounts.length === 0 ? (
          <Box className="px-6 py-8 text-center">
            <Typography variant="body2" color="text.secondary">
              Nenhuma conta encontrada.
            </Typography>
          </Box>
        ) : (
          <List disablePadding>
            {accounts.map((account) => (
              <AccountItem
                key={account.id}
                account={account}
                isActive={account.id === currentAccountId}
                isSwitching={switchingId === account.id}
                onSelect={selectAccount}
              />
            ))}
          </List>
        )}
      </DialogContent>
    </Dialog>
  );
}
