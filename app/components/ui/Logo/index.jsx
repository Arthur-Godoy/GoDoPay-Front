import { Box } from "@mui/material";
import { VARIANTS } from "./variants";

export default function Logo({ variant = "short", height = 32 }) {
  const { src, alt } = VARIANTS[variant];

  return (
    <Box
      component="img"
      src={src}
      alt={alt}
      className="block w-auto object-contain"
      sx={{ height }}
    />
  );
}
