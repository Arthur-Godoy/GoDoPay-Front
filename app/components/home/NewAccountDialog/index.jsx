import {
  Alert,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNewAccount } from "./useNewAccount";

export default function NewAccountDialog({ open, onClose }) {
  const { field, isSubmitting, submitError, onSubmit } = useNewAccount({
    open,
    onClose,
  });

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle className="flex flex-row items-center justify-between gap-4 pb-3">
        Nova conta
        <IconButton size="small" onClick={onClose} aria-label="Fechar">
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <Divider />

      <Stack component="form" noValidate onSubmit={onSubmit}>
        <DialogContent className="flex flex-col gap-4 px-6 pb-2 pt-5">
          {submitError && <Alert severity="error">{submitError}</Alert>}

          <Typography variant="body2" color="text.secondary">
            A agência, o número e o dígito são gerados automaticamente.
          </Typography>

          <TextField
            label="Nome da conta"
            placeholder="Conta Reserva"
            autoFocus
            fullWidth
            {...field("nickname")}
          />
        </DialogContent>

        <DialogActions className="px-6 pb-5 pt-3">
          <Button onClick={onClose} disabled={isSubmitting}>
            Cancelar
          </Button>

          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {isSubmitting ? (
              <CircularProgress size={22} color="inherit" />
            ) : (
              "Criar conta"
            )}
          </Button>
        </DialogActions>
      </Stack>
    </Dialog>
  );
}
