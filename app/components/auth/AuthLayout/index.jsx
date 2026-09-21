import { Box, Card, CardContent, Typography } from "@mui/material";
import Logo from "~/components/ui/Logo";

export default function AuthLayout({ title, subtitle, children }) {
  return (
    <Box
      component="main"
      className="flex min-h-screen items-center justify-center px-4 bg-[color:var(--mui-palette-background-default)]"
    >
      <Card className="w-full max-w-[420px]">
        <CardContent className="p-8 text-center">
          <Box className="mb-6 flex justify-center">
            <Logo variant="full" height={150} />
          </Box>

          <Typography variant="h4" component="h1" fontWeight={700} gutterBottom>
            {title}
          </Typography>

          <Typography variant="body2" color="text.secondary" className="mb-6">
            {subtitle}
          </Typography>

          {children}
        </CardContent>
      </Card>
    </Box>
  );
}
