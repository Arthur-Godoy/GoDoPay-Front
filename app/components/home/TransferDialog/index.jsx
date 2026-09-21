import { useState } from "react";
import { Dialog, DialogTitle, Divider, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useAccount } from "~/hooks/useAccount";
import { STEPS } from "~/contexts/transfer";
import AmountStep from "./AmountStep";
import ConfirmationStep from "./ConfirmationStep";
import ContactsStep from "./ContactsStep";
import NewContactStep from "./NewContactStep";

const TITLES = {
  [STEPS.Contacts]: "Escolha o destinatário",
  [STEPS.Amount]: "Insira o valor",
  [STEPS.Confirmation]: "Revise a transferência",
};

export default function TransferDialog({
  open,
  step,
  contact,
  amount,
  isSending,
  onClose,
  onSelectContact,
  onConfirmAmount,
  onBackToContacts,
  onBackToAmount,
  onSend,
}) {
  const { currentAccount } = useAccount();

  const [isCreatingContact, setIsCreatingContact] = useState(false);
  const [contactsVersion, setContactsVersion] = useState(0);

  const showNewContact = step === STEPS.Contacts && isCreatingContact;

  const closeNewContact = () => setIsCreatingContact(false);

  const handleContactCreated = () => {
    setContactsVersion((previous) => previous + 1);
    closeNewContact();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle className="flex flex-row items-center justify-between gap-4 pb-3">
        {showNewContact ? "Novo contato" : TITLES[step]}

        <IconButton size="small" onClick={onClose} aria-label="Fechar">
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <Divider />

      {showNewContact ? (
        <NewContactStep
          active={showNewContact}
          onCreated={handleContactCreated}
          onBack={closeNewContact}
        />
      ) : step === STEPS.Contacts ? (
        <ContactsStep
          active={open && step === STEPS.Contacts}
          reloadKey={contactsVersion}
          onSelectContact={onSelectContact}
          onNewContact={() => setIsCreatingContact(true)}
        />
      ) : step === STEPS.Amount ? (
        <AmountStep
          active={step === STEPS.Amount}
          contact={contact}
          balance={currentAccount?.balance ?? 0}
          onConfirm={onConfirmAmount}
          onBack={onBackToContacts}
        />
      ) : (
        <ConfirmationStep
          contact={contact}
          amount={amount}
          account={currentAccount}
          isSending={isSending}
          onSend={onSend}
          onBack={onBackToAmount}
        />
      )}
    </Dialog>
  );
}
