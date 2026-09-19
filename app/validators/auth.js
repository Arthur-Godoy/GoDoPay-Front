import * as yup from "yup";

const PASSWORD_MIN_LENGTH = 8;
const TEXT_MAX_LENGTH = 255;
const DOCUMENT_LENGTHS = [11, 14];

export const loginSchema = yup.object({
  email: yup.string().trim().required("Informe o e-mail").email("E-mail inválido"),
  password: yup.string().required("Informe a senha"),
});

export const registerSchema = yup.object({
  name: yup
    .string()
    .trim()
    .required("Informe o nome")
    .max(TEXT_MAX_LENGTH, `Máximo de ${TEXT_MAX_LENGTH} caracteres`),
  email: yup
    .string()
    .trim()
    .required("Informe o e-mail")
    .email("E-mail inválido")
    .max(TEXT_MAX_LENGTH, `Máximo de ${TEXT_MAX_LENGTH} caracteres`),
  document: yup
    .string()
    .required("Informe o CPF ou CNPJ")
    .test("document", "CPF ou CNPJ inválido", (value) =>
      DOCUMENT_LENGTHS.includes((value ?? "").replace(/\D/g, "").length),
    ),
  password: yup
    .string()
    .required("Informe a senha")
    .min(PASSWORD_MIN_LENGTH, `A senha deve ter no mínimo ${PASSWORD_MIN_LENGTH} caracteres`),
  password_confirmation: yup
    .string()
    .required("Confirme a senha")
    .oneOf([yup.ref("password")], "As senhas não conferem"),
});
