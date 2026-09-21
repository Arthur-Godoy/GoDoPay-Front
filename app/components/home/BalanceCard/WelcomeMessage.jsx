import { Skeleton, Typography } from "@mui/material";

export default function WelcomeMessage({ name, isLoading }) {
  if (isLoading) {
    return <Skeleton variant="text" width={280} height={40} />;
  }

  return (
    <Typography variant="h5" color="text.secondary" className="leading-tight mb-3" noWrap>
      Bem-vindo,{" "}
      <Typography
        component="span"
        variant="h5"
        className="font-bold leading-tight"
        sx={{ color: "primary.light" }}
      >
        {name}
      </Typography>
    </Typography>
  );
}
