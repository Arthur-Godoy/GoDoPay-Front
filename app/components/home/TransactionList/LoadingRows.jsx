import { Skeleton, TableCell, TableRow } from "@mui/material";

const SKELETON_ROWS = [0, 1, 2, 3, 4];

export default function LoadingRows({ columns }) {
  return SKELETON_ROWS.map((key) => (
    <TableRow key={key}>
      {columns.map((column) => (
        <TableCell key={column.field} align={column.align}>
          <Skeleton variant="text" />
        </TableCell>
      ))}
    </TableRow>
  ));
}
