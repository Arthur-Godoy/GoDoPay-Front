import { Box, Typography } from "@mui/material";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import IconBadge from "~/components/ui/IconBadge";

export default function EmptyState() {
  return (
    <Box className="flex flex-col items-center justify-center gap-3 px-6 py-12">
      <IconBadge icon={ReceiptLongIcon} size={52} tone="neutral" />
      <Typography variant="body2" color="text.secondary">
        Nenhum lançamento encontrado.
      </Typography>
    </Box>
  );
}
