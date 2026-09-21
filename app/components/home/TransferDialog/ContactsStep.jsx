import {
  Box,
  Button,
  DialogContent,
  Divider,
  List,
  TextField,
  Typography,
} from "@mui/material";
import PersonAddRoundedIcon from "@mui/icons-material/PersonAddRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ContactItem from "./ContactItem";
import ContactsSkeleton from "./ContactsSkeleton";
import { useContacts } from "./useContacts";

export default function ContactsStep({
  active,
  reloadKey,
  onSelectContact,
  onNewContact,
}) {
  const { contacts, isLoading, search, changeSearch } = useContacts({
    active,
    reloadKey,
  });

  return (
    <DialogContent className="flex flex-col gap-0 px-0 pb-2 pt-0">
      <Box className="flex flex-col gap-3 px-6 py-4 sm:flex-row sm:items-center">
        <TextField
          placeholder="Buscar contato"
          value={search}
          onChange={(event) => changeSearch(event.target.value)}
          size="small"
          fullWidth
          slotProps={{
            input: {
              startAdornment: (
                <SearchRoundedIcon fontSize="small" className="mr-2 opacity-70" />
              ),
            },
          }}
        />

        <Button
          onClick={onNewContact}
          variant="contained"
          startIcon={<PersonAddRoundedIcon />}
          className="shrink-0"
        >
          Novo
        </Button>
      </Box>

      <Divider />

      {isLoading ? (
        <ContactsSkeleton />
      ) : contacts.length === 0 ? (
        <Box className="px-6 py-10 text-center">
          <Typography variant="body2" color="text.secondary">
            {search
              ? "Nenhum contato encontrado."
              : "Você ainda não tem contatos."}
          </Typography>
        </Box>
      ) : (
        <List disablePadding className="max-h-[320px] overflow-y-auto py-1">
          {contacts.map((contact) => (
            <ContactItem
              key={contact.id}
              contact={contact}
              onSelect={onSelectContact}
            />
          ))}
        </List>
      )}
    </DialogContent>
  );
}
