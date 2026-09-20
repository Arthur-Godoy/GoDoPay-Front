import {
  Alert,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDeposit } from "./useDeposit";

export default function DepositDialog({ open, onClose }) {
  const { account, amountField, isSubmitting, submitError, onSubmit } =
    useDeposit({ open, onClose });

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle className="flex flex-row items-center justify-between gap-4 pb-3">
        Depositar
        <IconButton size="small" onClick={onClose} aria-label="Fechar">
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <Stack component="form" noValidate onSubmit={onSubmit}>
        <DialogContent className="flex flex-col gap-4 pt-1">
          {submitError && <Alert severity="error">{submitError}</Alert>}

          <Typography variant="body2" color="text.secondary">
            O valor será creditado na conta {account?.nickname}.
          </Typography>

          <TextField
            label="Valor"
            inputMode="numeric"
            autoFocus
            fullWidth
            slotProps={{ htmlInput: { className: "text-right tabular-nums" } }}
            {...amountField}
          />
        </DialogContent>

        <DialogActions className="px-6 pb-5 pt-0">
          <Button onClick={onClose} disabled={isSubmitting}>
            Cancelar
          </Button>

          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {isSubmitting ? (
              <CircularProgress size={22} color="inherit" />
            ) : (
              "Depositar"
            )}
          </Button>
        </DialogActions>
      </Stack>
    </Dialog>
  );
}
