import { AppBar, Toolbar } from "@mui/material";
import Logo from "~/components/ui/Logo";

export default function LayoutAppBar() {
  return (
    <AppBar position="fixed" color="inherit" elevation={0} enableColorOnDark>
      <Toolbar className="flex items-center gap-3 min-h-[68px]">
        <Logo variant="short" height={42} />
      </Toolbar>
    </AppBar>
  );
}
