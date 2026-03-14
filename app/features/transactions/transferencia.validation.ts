import type { TFunction } from "i18next";
import type { Cuenta } from "@/app/types/cuenta.types";

interface ValidarTransferenciaParams {
  cuentaOrigenId: string;
  cuentaDestinoId: string;
  monto: number;
  cuentaOrigen?: Cuenta;
  t: TFunction;
}

export function validarTransferencia({
  cuentaOrigenId,
  cuentaDestinoId,
  monto,
  cuentaOrigen,
  t,
}: ValidarTransferenciaParams): string | null {
  if (!cuentaOrigenId) {
    return t("transfer.validation.originRequired");
  }

  if (!cuentaDestinoId) {
    return t("transfer.validation.destinationRequired");
  }

  if (cuentaOrigenId === cuentaDestinoId) {
    return t("transfer.validation.sameAccount");
  }

  if (!monto || Number.isNaN(monto)) {
    return t("transfer.validation.invalidAmount");
  }

  if (monto <= 0) {
    return t("transfer.validation.amountGreaterThanZero");
  }

  if (!cuentaOrigen) {
    return t("transfer.validation.originNotFound");
  }

  if (monto > cuentaOrigen.saldo) {
    return t("transfer.validation.insufficientBalance");
  }

  return null;
}