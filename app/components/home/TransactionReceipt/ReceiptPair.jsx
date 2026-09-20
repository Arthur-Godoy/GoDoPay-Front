import { Box } from "@mui/material";

export default function ReceiptPair({ children }) {
  return <Box className="flex flex-row gap-6">{children}</Box>;
}
