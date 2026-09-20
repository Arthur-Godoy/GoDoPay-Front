import { Box, Skeleton } from "@mui/material";

export default function ReceiptSkeleton() {
  return (
    <Box className="flex flex-col gap-4 px-6 py-8">
      <Skeleton variant="text" width="60%" height={48} />
      <Skeleton variant="rectangular" height={120} />
      <Skeleton variant="text" width="40%" />
    </Box>
  );
}
