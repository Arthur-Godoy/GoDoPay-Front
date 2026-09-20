import { Box, Skeleton } from "@mui/material";

const SKELETON_ITEMS = [0, 1];

export default function LoadingAccounts() {
  return (
    <Box>
      {SKELETON_ITEMS.map((key) => (
        <Box key={key} className="flex flex-row items-center gap-4 px-6 py-3.5">
          <Skeleton variant="rounded" width={40} height={40} />
          <Box className="flex flex-1 flex-col gap-1">
            <Skeleton variant="text" width="50%" />
            <Skeleton variant="text" width="35%" />
          </Box>
          <Skeleton variant="text" width={70} />
        </Box>
      ))}
    </Box>
  );
}
