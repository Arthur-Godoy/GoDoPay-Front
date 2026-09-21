import { Box, Skeleton } from "@mui/material";

const SKELETON_ITEMS = [0, 1, 2];

export default function ContactsSkeleton() {
  return (
    <Box>
      {SKELETON_ITEMS.map((key) => (
        <Box key={key} className="flex flex-row items-center gap-3 px-6 py-3">
          <Skeleton variant="circular" width={40} height={40} />
          <Box className="flex flex-1 flex-col gap-1">
            <Skeleton variant="text" width="45%" />
            <Skeleton variant="text" width="30%" />
          </Box>
        </Box>
      ))}
    </Box>
  );
}
