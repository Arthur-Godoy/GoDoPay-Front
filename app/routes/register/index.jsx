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
import { useRegister } from "./useRegister";

export default function Register() {
  const { field, masks, isSubmitting, submitError, onSubmit } = useRegister();

  return (
    <AuthLayout
      title="Criar conta"
      subtitle="Preencha seus dados para abrir sua conta GoDoPay"
    >
      <Stack component="form" spacing={2} noValidate onSubmit={onSubmit}>
        {submitError && <Alert severity="error">{submitError}</Alert>}

        <TextField
          label="Nome"
          autoComplete="name"
          autoFocus
          fullWidth
          {...field("name")}
        />
        <TextField
          label="E-mail"
          type="email"
          autoComplete="email"
          fullWidth
          {...field("email")}
        />
        <TextField
          label="CPF ou CNPJ"
          fullWidth
          placeholder="000.000.000-00"
          slotProps={{ htmlInput: { inputMode: "numeric" } }}
          {...field("document", masks.document)}
        />
        <TextField
          label="Senha"
          type="password"
          autoComplete="new-password"
          fullWidth
          {...field("password")}
        />
        <TextField
          label="Confirmar senha"
          type="password"
          autoComplete="new-password"
          fullWidth
          {...field("password_confirmation")}
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
            "Criar conta"
          )}
        </Button>

        <Typography variant="body2" align="center">
          Já tem conta?{" "}
          <Link component={RouterLink} to="/login">
            Entrar
          </Link>
        </Typography>
      </Stack>
    </AuthLayout>
  );
}
