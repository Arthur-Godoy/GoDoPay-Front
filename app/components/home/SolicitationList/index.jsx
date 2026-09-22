import {
  Box,
  Divider,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import SwapVertRoundedIcon from "@mui/icons-material/SwapVertRounded";
import IconBadge from "~/components/ui/IconBadge";
import SolicitationItem from "./SolicitationItem";
import SolicitationsSkeleton from "./SolicitationsSkeleton";
import { STATUSES } from "./options";
import { useSolicitations } from "./useSolicitations";

export default function SolicitationList({ active, direction }) {
  const {
    solicitations,
    isLoading,
    status,
    changeStatus,
    page,
    total,
    perPage,
    changePage,
    pendingId,
    approve,
    reject,
    remove,
  } = useSolicitations({ active, direction });

  const isSent = direction === "sent";

  return (
    <>
      <Box className="mt-4 px-5 pb-4">
        <TextField
          label="Situação"
          value={status}
          onChange={(event) => changeStatus(event.target.value)}
          size="small"
          select
          className="w-full sm:w-[220px]"
        >
          {STATUSES.map(({ value, label }) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      <Divider />

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{isSent ? "Destinatário" : "Solicitante"}</TableCell>
              <TableCell align="center">Valor</TableCell>
              <TableCell align="center">Situação</TableCell>
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {isLoading ? (
              <SolicitationsSkeleton />
            ) : solicitations.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="border-0 p-0">
                  <Box className="flex flex-col items-center justify-center gap-3 px-6 py-12">
                    <IconBadge icon={SwapVertRoundedIcon} size={52} tone="neutral" />
                    <Typography variant="body2" color="text.secondary">
                      Nenhuma solicitação encontrada.
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              solicitations.map((solicitation) => (
                <SolicitationItem
                  key={solicitation.id}
                  solicitation={solicitation}
                  isSent={isSent}
                  isPending={pendingId === solicitation.id}
                  onApprove={approve}
                  onReject={reject}
                  onRemove={remove}
                />
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
    </>
  );
}
