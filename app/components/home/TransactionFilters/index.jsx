import { Box, Button, MenuItem, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TYPES } from "./options";
import { useTransactionFilters } from "./useTransactionFilters";

export default function TransactionFilters({ filters, onChange, onClear }) {
  const { selectField, dateField, hasActiveFilters } = useTransactionFilters({
    filters,
    onChange,
  });

  return (
    <Box className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <TextField label="Tipo" {...selectField("type")}>
        {TYPES.map(({ value, label }) => (
          <MenuItem key={label} value={value}>
            {label}
          </MenuItem>
        ))}
      </TextField>

      <DatePicker label="De" {...dateField("start_date")} />

      <DatePicker label="Até" {...dateField("end_date")} />

      <Button
        onClick={onClear}
        disabled={!hasActiveFilters}
        className="shrink-0 sm:min-w-[110px]"
      >
        Limpar
      </Button>
    </Box>
  );
}
