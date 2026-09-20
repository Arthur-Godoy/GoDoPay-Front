import { Box } from "@mui/material";

const TONES = {
  primary:
    "bg-[color:var(--mui-palette-action-selected)] text-[color:var(--mui-palette-primary-light)]",
  success:
    "bg-[rgba(123,168,106,0.14)] text-[color:var(--mui-palette-success-main)]",
  error:
    "bg-[rgba(201,104,94,0.14)] text-[color:var(--mui-palette-error-main)]",
  neutral:
    "bg-[color:var(--mui-palette-action-hover)] text-[color:var(--mui-palette-text-secondary)]",
};

const ICON_RATIO = 0.45;

export default function IconBadge({ icon: Icon, size = 40, tone = "primary" }) {
  return (
    <Box
      className={`inline-flex shrink-0 items-center justify-center rounded-lg ${TONES[tone]}`}
      sx={{ width: size, height: size }}
    >
      <Icon className="block" sx={{ fontSize: Math.round(size * ICON_RATIO) }} />
    </Box>
  );
}
