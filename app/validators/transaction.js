import * as yup from "yup";

const MIN_AMOUNT_IN_CENTS = 1;
const AGENCY_LENGTH = 4;
const DIGIT_LENGTH = 1;

export const depositSchema = yup.object({
  amount: yup
    .number()
    .required("Informe o valor")
    .min(MIN_AMOUNT_IN_CENTS, "O valor deve ser maior que zero"),
});

export const contactSchema = yup.object({
  agency: yup
    .string()
    .trim()
    .required("Informe a agência")
    .length(AGENCY_LENGTH, `A agência deve ter ${AGENCY_LENGTH} dígitos`),
  number: yup.string().trim().required("Informe o número da conta"),
  digit: yup
    .string()
    .trim()
    .required("Informe o dígito")
    .length(DIGIT_LENGTH, "O dígito deve ter 1 caractere"),
});
