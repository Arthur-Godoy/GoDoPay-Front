import { Box, Typography } from "@mui/material";

export default function ReceiptRow({ label, value, mono = false }) {
  return (
    <Box className="flex min-w-0 flex-1 flex-col items-start gap-0.5">
      <Typography variant="caption" className="font-bold tracking-wide">
        {label}:
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        className={
          mono
            ? "w-full break-all font-mono text-[11px] leading-relaxed"
            : "w-full break-words"
        }
      >
        {value}
      </Typography>
    </Box>
  );
}
