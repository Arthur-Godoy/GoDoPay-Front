const AGENCY_LENGTH = 4;
const ACCOUNT_NUMBER_LENGTH = 8;
const DIGIT_LENGTH = 1;

function onlyDigits(value) {
  return String(value ?? "").replace(/\D/g, "");
}

export function maskAgency(value) {
  return onlyDigits(value).slice(0, AGENCY_LENGTH);
}

export function maskAccountNumber(value) {
  return onlyDigits(value).slice(0, ACCOUNT_NUMBER_LENGTH);
}

export function maskDigit(value) {
  return onlyDigits(value).slice(0, DIGIT_LENGTH);
}

const CPF_LENGTH = 11;
const CNPJ_LENGTH = 14;

export function maskDocument(value) {
  const digits = onlyDigits(value).slice(0, CNPJ_LENGTH);

  if (digits.length <= CPF_LENGTH) {
    return digits
      .replace(/^(\d{3})(\d)/, "$1.$2")
      .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1-$2");
  }

  return digits
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2");
}
