import {
  Alert,
  Box,
  Button,
  CircularProgress,
  DialogActions,
  DialogContent,
  Stack,
  TextField,
} from "@mui/material";
import { useNewContact } from "./useNewContact";

export default function NewContactStep({ active, onCreated, onBack }) {
  const { field, masks, isSubmitting, submitError, onSubmit } = useNewContact({
    active,
    onCreated,
  });

  return (
    <Stack component="form" noValidate onSubmit={onSubmit}>
      <DialogContent className="flex flex-col gap-4 px-6 pb-2 pt-5">
        {submitError && <Alert severity="error">{submitError}</Alert>}

        <TextField
          label="Agência"
          autoFocus
          fullWidth
          placeholder="0001"
          slotProps={{ htmlInput: { inputMode: "numeric" } }}
          {...field("agency", masks.agency)}
        />

        <Box className="flex flex-row gap-3">
          <TextField
            label="Conta"
            fullWidth
            placeholder="12345678"
            slotProps={{ htmlInput: { inputMode: "numeric" } }}
            {...field("number", masks.number)}
          />

          <TextField
            label="Dígito"
            className="w-[110px] shrink-0"
            slotProps={{
              htmlInput: { inputMode: "numeric", className: "text-center" },
            }}
            {...field("digit", masks.digit)}
          />
        </Box>
      </DialogContent>

      <DialogActions className="px-6 pb-5 pt-3">
        <Button onClick={onBack} disabled={isSubmitting}>
          Voltar
        </Button>

        <Button type="submit" variant="contained" disabled={isSubmitting}>
          {isSubmitting ? (
            <CircularProgress size={22} color="inherit" />
          ) : (
            "Adicionar"
          )}
        </Button>
      </DialogActions>
    </Stack>
  );
}
