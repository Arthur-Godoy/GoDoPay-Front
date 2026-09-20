import { Outlet } from "react-router";
import { Box, Toolbar } from "@mui/material";
import LayoutAppBar from "./AppBar";
import { AccountProvider } from "~/contexts/accountContext";
import { ReceiptProvider } from "~/contexts/receiptContext";

export default function AppLayout() {
  return (
    <AccountProvider>
      <ReceiptProvider>
        <Box className="flex min-h-screen flex-col">
          <LayoutAppBar />
          <Toolbar className="min-h-[68px]" />

          <Box
            component="main"
            className="flex flex-1 flex-col px-4 py-6 sm:px-6"
          >
            <Outlet />
          </Box>
        </Box>
      </ReceiptProvider>
    </AccountProvider>
  );
}
