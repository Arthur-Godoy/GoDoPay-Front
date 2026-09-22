import { Skeleton, TableCell, TableRow } from "@mui/material";

const SKELETON_ROWS = [0, 1, 2];

export default function SolicitationsSkeleton() {
  return SKELETON_ROWS.map((key) => (
    <TableRow key={key}>
      <TableCell>
        <Skeleton variant="text" width="60%" />
      </TableCell>
      <TableCell align="center">
        <Skeleton variant="text" width={80} className="mx-auto" />
      </TableCell>
      <TableCell align="center">
        <Skeleton variant="rounded" width={90} height={24} className="mx-auto" />
      </TableCell>
      <TableCell align="right">
        <Skeleton variant="text" width={70} className="ml-auto" />
      </TableCell>
    </TableRow>
  ));
}
