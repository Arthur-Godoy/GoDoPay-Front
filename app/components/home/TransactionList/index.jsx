import { useMemo } from "react";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
import TransactionFilters from "~/components/home/TransactionFilters";
import { useReceipt } from "~/hooks/useReceipt";
import { buildColumns } from "./columns";
import EmptyState from "./EmptyState";
import LoadingRows from "./LoadingRows";
import { useTransactions } from "./useTransactions";

export default function TransactionList() {
  const {
    transactions,
    accountId,
    isLoading,
    page,
    total,
    perPage,
    changePage,
    filters,
    changeFilter,
    clearFilters,
    sort,
    changeSort,
  } = useTransactions();

  const { openReceipt } = useReceipt();

  const columns = useMemo(() => buildColumns(accountId), [accountId]);

  return (
    <Card>
      <CardContent className="p-5 pb-4">
        <Box className="mb-4 flex flex-row items-center justify-between gap-4">
          <Typography variant="h6">Extrato</Typography>

          {!isLoading && total > 0 && (
            <Typography variant="caption" color="text.secondary">
              {total} lançamentos
            </Typography>
          )}
        </Box>

        <TransactionFilters
          filters={filters}
          onChange={changeFilter}
          onClear={clearFilters}
        />
      </CardContent>

      <Divider />

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.field}
                  align={column.headerAlign ?? column.align}
                  sortDirection={
                    sort.order_by === column.field ? sort.order : false
                  }
                >
                  {column.sortable ? (
                    <TableSortLabel
                      active={sort.order_by === column.field}
                      direction={
                        sort.order_by === column.field ? sort.order : "asc"
                      }
                      onClick={() => changeSort(column.field)}
                    >
                      {column.headerName}
                    </TableSortLabel>
                  ) : (
                    column.headerName
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {isLoading ? (
              <LoadingRows columns={columns} />
            ) : transactions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="border-0 p-0">
                  <EmptyState />
                </TableCell>
              </TableRow>
            ) : (
              transactions.map((row) => (
                <TableRow
                  key={row.id}
                  hover
                  onClick={() => openReceipt(row)}
                  className="cursor-pointer"
                >
                  {columns.map((column) => (
                    <TableCell key={column.field} align={column.align}>
                      {column.render(row)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Divider />

      <TablePagination
        component="div"
        count={total}
        page={page - 1}
        rowsPerPage={perPage}
        rowsPerPageOptions={[perPage]}
        labelRowsPerPage="Por página"
        labelDisplayedRows={({ from, to, count }) => `${from}–${to} de ${count}`}
        onPageChange={(_, nextPage) => changePage(nextPage + 1)}
      />
    </Card>
  );
}
