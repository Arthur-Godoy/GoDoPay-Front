import { useCallback, useEffect, useMemo, useState } from "react";
import { contactService } from "~/services/http/contactService";
import { contactName } from "./contactLabel";

function matches(contact, term) {
  const account = contact.account ?? contact;

  const haystack = [
    contactName(contact),
    account.agency,
    account.number,
    account.digit,
  ]
    .join(" ")
    .toLowerCase();

  return haystack.includes(term);
}

export function useContacts({ active, reloadKey }) {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  const loadContacts = useCallback(async () => {
    setIsLoading(true);

    try {
      const { data } = await contactService.list();

      setContacts(Array.isArray(data) ? data : []);
    } catch {
      setContacts([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!active) return;

    loadContacts();
  }, [active, reloadKey, loadContacts]);

  const filteredContacts = useMemo(() => {
    const term = search.trim().toLowerCase();

    if (!term) return contacts;

    return contacts.filter((contact) => matches(contact, term));
  }, [contacts, search]);

  return {
    contacts: filteredContacts,
    isLoading,
    search,
    changeSearch: setSearch,
  };
}
