import { Box, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export default function BalanceActions({ isHidden, onToggleHidden, onOpenMenu }) {
  return (
    <Box className="flex shrink-0 flex-row items-center gap-1">
      <IconButton
        size="small"
        onClick={onToggleHidden}
        aria-label={isHidden ? "Mostrar saldo" : "Ocultar saldo"}
      >
        {isHidden ? (
          <VisibilityOffIcon fontSize="small" />
        ) : (
          <VisibilityIcon fontSize="small" />
        )}
      </IconButton>

      <IconButton size="small" onClick={onOpenMenu} aria-label="Mais opções">
        <MoreVertIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}
