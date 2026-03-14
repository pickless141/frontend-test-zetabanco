import type { Cuenta } from "@/app/types/cuenta.types";
import type { Transferencia } from "@/app/types/transferencia.types";

interface CrearTransferenciaParams {
  cuentaOrigen: Cuenta;
  cuentaDestino: Cuenta;
  monto: number;
}

export function crearTransferencia({
  cuentaOrigen,
  cuentaDestino,
  monto,
}: CrearTransferenciaParams): Transferencia {
  return {
    id: crypto.randomUUID(),
    cuentaOrigenId: cuentaOrigen.id,
    cuentaDestinoId: cuentaDestino.id,
    nombreCuentaOrigen: cuentaOrigen.nombreTitular,
    nombreCuentaDestino: cuentaDestino.nombreTitular,
    monto,
    fecha: new Date().toISOString(),
  };
}