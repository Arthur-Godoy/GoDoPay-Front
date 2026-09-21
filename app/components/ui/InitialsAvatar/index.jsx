import { Avatar } from "@mui/material";

const MAX_INITIALS = 2;

function toInitials(name) {
  const words = (name ?? "").trim().split(/\s+/).filter(Boolean);

  if (words.length === 0) return "?";

  return words
    .slice(0, MAX_INITIALS)
    .map((word) => word[0].toUpperCase())
    .join("");
}

export default function InitialsAvatar({ name, size = 40 }) {
  return (
    <Avatar
      className="font-semibold"
      sx={{
        width: size,
        height: size,
        fontSize: size / 2.6,
        bgcolor: "rgba(182, 139, 75, 0.18)",
        color: "primary.light",
      }}
    >
      {toInitials(name)}
    </Avatar>
  );
}
