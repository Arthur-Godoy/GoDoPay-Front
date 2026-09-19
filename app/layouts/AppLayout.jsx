import { Outlet } from "react-router";
import { Box } from "@mui/material";
import LayoutAppBar from "./AppBar";
import { AccountProvider } from "~/contexts/accountContext";

export default function AppLayout() {
  return (
    <AccountProvider>
      <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <LayoutAppBar />
        <Box
          component="main"
          sx={{
            mt: 8,
            p: 3,
            flex: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </AccountProvider>
  );
}
