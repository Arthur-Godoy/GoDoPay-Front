import { useState } from "react";
import { Box } from "@mui/material";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import SavingsRoundedIcon from "@mui/icons-material/SavingsRounded";
import DepositDialog from "~/components/home/DepositDialog";
import { useTransfer } from "~/hooks/useTransfer";
import ActionCard from "./ActionCard";

export default function QuickActions() {
  const { openTransfer } = useTransfer();

  const [isDepositOpen, setIsDepositOpen] = useState(false);

  return (
    <Box className="flex flex-col gap-4 sm:flex-row">
      <ActionCard
        icon={SendRoundedIcon}
        label="Transferir"
        description="Envie para um contato"
        onClick={openTransfer}
      />
      <ActionCard
        icon={SavingsRoundedIcon}
        label="Depositar"
        description="Adicione saldo à conta"
        onClick={() => setIsDepositOpen(true)}
      />

      <DepositDialog
        open={isDepositOpen}
        onClose={() => setIsDepositOpen(false)}
      />
    </Box>
  );
}
