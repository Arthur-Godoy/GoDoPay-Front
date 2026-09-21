import { AppBar, Box, CircularProgress, Divider, IconButton, Toolbar, Tooltip } from "@mui/material";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import Logo from "~/components/ui/Logo";
import { useLogout } from "./useLogout";

export default function LayoutAppBar() {
  const { isLoggingOut, logout } = useLogout();

  return (
    <AppBar position="fixed" color="inherit" elevation={0} enableColorOnDark>
      <Toolbar className="flex items-center gap-3 min-h-[68px]">
        <Logo variant="short" height={72} />

        <Box className="flex-1" />

        <Tooltip title="Sair">
          <span>
            <IconButton
              onClick={logout}
              disabled={isLoggingOut}
              aria-label="Sair"
            >
              {isLoggingOut ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                <LogoutRoundedIcon />
              )}
            </IconButton>
          </span>
        </Tooltip>
      </Toolbar>
      <Divider />
    </AppBar>
  );
}
