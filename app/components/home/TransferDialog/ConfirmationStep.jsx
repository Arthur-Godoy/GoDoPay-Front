import {
  Box,
  Button,
  CircularProgress,
  DialogActions,
  DialogContent,
  Divider,
  Typography,
} from "@mui/material";
import ReceiptRow from "~/components/home/TransactionReceipt/ReceiptRow";
import { formatMoney } from "~/utils/money";
import { contactAccount, contactName } from "./contactLabel";

export default function ConfirmationStep({
  contact,
  amount,
  account,
  isSending,
  onSend,
  onBack,
}) {
  return (
    <>
      <DialogContent className="px-6 pb-2 pt-0">
        <Box className="flex flex-col items-center gap-1 py-6">
          <Typography variant="overline" color="text.secondary">
            Valor da transferência
          </Typography>
          <Typography
            className="text-[30px] font-bold leading-tight tabular-nums"
            sx={{ color: "primary.light" }}
          >
            {formatMoney(amount)}
          </Typography>
        </Box>

        <Divider />

        <Box className="flex flex-col gap-3 py-5">
          <Typography variant="overline" color="text.secondary" className="leading-none">
            Origem
          </Typography>

          <ReceiptRow label="Conta" value={account?.nickname ?? "Conta"} />
          <ReceiptRow
            label="Agência e conta"
            value={`Ag ${account?.agency} · CC ${account?.number}-${account?.digit}`}
          />
        </Box>

        <Divider />

        <Box className="flex flex-col gap-3 py-5">
          <Typography variant="overline" color="text.secondary" className="leading-none">
            Destino
          </Typography>

          <ReceiptRow label="Favorecido" value={contactName(contact)} />
          <ReceiptRow label="Agência e conta" value={contactAccount(contact)} />
        </Box>

        <Divider />

        <Box className="pt-5 text-center">
          <Typography variant="caption" color="text.secondary">
            Confira os dados antes de confirmar. A transferência é imediata.
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions className="px-6 pb-5 pt-3">
        <Button onClick={onBack} disabled={isSending}>
          Voltar
        </Button>

        <Button variant="contained" disabled={isSending} onClick={onSend}>
          {isSending ? (
            <CircularProgress size={22} color="inherit" />
          ) : (
            "Confirmar envio"
          )}
        </Button>
      </DialogActions>
    </>
  );
}
