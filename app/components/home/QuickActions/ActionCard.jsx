import { Box, Card, CardActionArea, Typography } from "@mui/material";
import IconBadge from "~/components/ui/IconBadge";

export default function ActionCard({ icon, label, description, onClick }) {
  return (
    <Card className="flex-1">
      <CardActionArea onClick={onClick} className="h-full p-4">
        <Box className="flex flex-row items-center gap-3">
          <IconBadge icon={icon} size={44} />

          <Box className="flex min-w-0 flex-col gap-0.5">
            <Typography variant="subtitle2">{label}</Typography>
            <Typography variant="caption" color="text.secondary">
              {description}
            </Typography>
          </Box>
        </Box>
      </CardActionArea>
    </Card>
  );
}
