import * as yup from "yup";

const MIN_AMOUNT_IN_CENTS = 1;

export const depositSchema = yup.object({
  amount: yup
    .number()
    .required("Informe o valor")
    .min(MIN_AMOUNT_IN_CENTS, "O valor deve ser maior que zero"),
});
