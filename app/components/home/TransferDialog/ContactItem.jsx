import { Box, ListItemButton, Typography } from "@mui/material";
import InitialsAvatar from "~/components/ui/InitialsAvatar";
import { contactAccount, contactName } from "./contactLabel";

export default function ContactItem({ contact, onSelect }) {
  return (
    <ListItemButton
      onClick={() => onSelect(contact)}
      className="flex flex-row items-center gap-3 px-6 py-3"
    >
      <InitialsAvatar name={contact.account?.user?.name} />

      <Box className="flex min-w-0 flex-1 flex-col gap-0.5">
        <Typography variant="body2" noWrap>
          {contactName(contact)}
        </Typography>
        <Typography variant="caption" color="text.secondary" noWrap>
          {contactAccount(contact)}
        </Typography>
      </Box>
    </ListItemButton>
  );
}
