import { useEffect, useState } from "react";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import InitialsAvatar from "~/components/ui/InitialsAvatar";
import { formatMoney, parseMoney } from "~/utils/money";
import { contactAccount, contactName } from "./contactLabel";

export default function AmountStep({
  active,
  contact,
  balance,
  onConfirm,
  onBack,
}) {
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    if (!active) return;

    setAmount(0);
  }, [active]);

  const exceedsBalance = amount > balance;
  const isValid = amount > 0 && !exceedsBalance;

  return (
    <>
      <DialogContent className="flex flex-col gap-5 px-6 pb-2 pt-5">
        <Box className="flex flex-col gap-2">
          <Typography variant="overline" color="text.secondary" className="leading-none">
            Destinatário
          </Typography>

          <Box className="flex flex-row items-center gap-3 rounded-lg border border-solid p-3 border-[color:var(--mui-palette-divider)]">
            <InitialsAvatar name={contact?.account?.user?.name} size={38} />

            <Box className="flex min-w-0 flex-col gap-0.5">
              <Typography variant="body2" noWrap>
                {contactName(contact)}
              </Typography>
              <Typography variant="caption" color="text.secondary" noWrap>
                {contactAccount(contact)}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Divider />

        <TextField
          label="Valor"
          value={formatMoney(amount)}
          onChange={(event) => setAmount(parseMoney(event.target.value))}
          inputMode="numeric"
          autoFocus
          fullWidth
          error={exceedsBalance}
          helperText={
            exceedsBalance
              ? `Saldo disponível: ${formatMoney(balance)}`
              : undefined
          }
          slotProps={{ htmlInput: { className: "text-right tabular-nums" } }}
        />
      </DialogContent>

      <DialogActions className="px-6 pb-5 pt-3">
        <Button onClick={onBack}>Voltar</Button>

        <Button
          variant="contained"
          disabled={!isValid}
          onClick={() => onConfirm(amount)}
        >
          Continuar
        </Button>
      </DialogActions>
    </>
  );
}
