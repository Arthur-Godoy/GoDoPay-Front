import { Box, Typography } from "@mui/material";

export default function AccountChip({ agency, number, digit }) {
  return (
    <Box className="inline-flex w-fit items-center gap-2 rounded-md border border-solid px-2.5 py-1 border-[color:var(--mui-palette-divider)] bg-[rgba(255,255,255,0.04)]">
      <Typography
        variant="caption"
        color="text.secondary"
        className="leading-none tabular-nums"
      >
        Ag {agency}
      </Typography>

      <Box className="size-[3px] rounded-full opacity-60 bg-[color:var(--mui-palette-text-secondary)]" />

      <Typography
        variant="caption"
        color="text.secondary"
        className="leading-none tabular-nums"
      >
        CC {number}-{digit}
      </Typography>
    </Box>
  );
}
