import { AppBar, Toolbar, Box, Typography } from "@mui/material";

export default function LayoutAppBar() {
  return (
    <AppBar position="fixed" color="inherit" elevation={0} enableColorOnDark>
      <Toolbar sx={{ gap: 1.5, minHeight: 68 }}>
        <Box sx={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
          <Typography
            sx={{ fontWeight: 700, fontSize: 17, color: "text.primary" }}
          >
            GoDoPay
          </Typography>
          <Typography
            sx={{
              fontSize: 11,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "text.secondary",
            }}
          >
            Conta digital
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
