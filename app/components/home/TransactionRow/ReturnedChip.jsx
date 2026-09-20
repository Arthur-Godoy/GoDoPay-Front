import { Chip } from "@mui/material";

export default function ReturnedChip() {
  return (
    <Chip
      label="Estornada"
      size="small"
      color="error"
      variant="outlined"
      className="h-[18px] text-[10px] font-semibold tracking-wide [&_.MuiChip-label]:px-1.5"
    />
  );
}
