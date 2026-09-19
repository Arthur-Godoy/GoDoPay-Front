import { Link as RouterLink } from "react-router";
import {
  Alert,
  Button,
  CircularProgress,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AuthLayout from "../../components/auth/AuthLayout";
import { useLogin } from "./useLogin";

export default function Login() {
  const { field, isSubmitting, submitError, onSubmit } = useLogin();

  return (
    <AuthLayout title="Entrar" subtitle="Acesse sua conta GoDoPay">
      <Stack component="form" spacing={2} noValidate onSubmit={onSubmit}>
        {submitError && <Alert severity="error">{submitError}</Alert>}

        <TextField
          label="E-mail"
          type="email"
          autoComplete="email"
          autoFocus
          fullWidth
          {...field("email")}
        />
        <TextField
          label="Senha"
          type="password"
          autoComplete="current-password"
          fullWidth
          {...field("password")}
        />

        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={isSubmitting}
          fullWidth
        >
          {isSubmitting ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Entrar"
          )}
        </Button>

        <Typography variant="body2" align="center">
          Não tem conta?{" "}
          <Link component={RouterLink} to="/register">
            Cadastre-se
          </Link>
        </Typography>
      </Stack>
    </AuthLayout>
  );
}
