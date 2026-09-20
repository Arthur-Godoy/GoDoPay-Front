import { useCallback, useMemo } from "react";
import dayjs from "dayjs";

const API_DATE_FORMAT = "YYYY-MM-DD";
const DISPLAY_DATE_FORMAT = "DD/MM/YYYY";

export function useTransactionFilters({ filters, onChange }) {
  const selectField = useCallback(
    (name) => ({
      value: filters[name] ?? "",
      onChange: (event) => onChange(name, event.target.value),
      size: "small",
      fullWidth: true,
      select: true,
    }),
    [filters, onChange],
  );

  const dateField = useCallback(
    (name) => ({
      value: filters[name] ? dayjs(filters[name]) : null,
      onChange: (date) =>
        onChange(name, date?.isValid() ? date.format(API_DATE_FORMAT) : ""),
      format: DISPLAY_DATE_FORMAT,
      slotProps: {
        textField: { size: "small", fullWidth: true },
        field: { clearable: true },
      },
    }),
    [filters, onChange],
  );

  const hasActiveFilters = useMemo(
    () => Object.values(filters).some((value) => value !== ""),
    [filters],
  );

  return { selectField, dateField, hasActiveFilters };
}
