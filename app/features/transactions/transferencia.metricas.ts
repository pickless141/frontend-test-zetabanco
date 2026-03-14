import type { Cuenta } from "@/app/types/cuenta.types";
import type { Transferencia } from "@/app/types/transferencia.types";

interface CuentaConMasTransferencias {
  cuenta: Cuenta;
  cantidad: number;
}

interface DatoGraficaPorCuentaOrigen {
  cuentaId: string;
  nombre: string;
  total: number;
}

export function obtenerTransferenciasDelDia(
  transferencias: Transferencia[],
): Transferencia[] {
  const hoy = new Date();

  return transferencias.filter((transferencia) => {
    const fecha = new Date(transferencia.fecha);

    return (
      fecha.getFullYear() === hoy.getFullYear() &&
      fecha.getMonth() === hoy.getMonth() &&
      fecha.getDate() === hoy.getDate()
    );
  });
}

export function calcularTotalTransferido(
  transferencias: Transferencia[],
): number {
  return transferencias.reduce(
    (acc, transferencia) => acc + transferencia.monto,
    0,
  );
}

export function calcularTotalTransacciones(
  transferencias: Transferencia[],
): number {
  return transferencias.length;
}

export function obtenerCuentaConMasTransferencias(
  transferencias: Transferencia[],
  cuentas: Cuenta[],
): CuentaConMasTransferencias | null {
  if (transferencias.length === 0) {
    return null;
  }

  const contadorPorCuenta: Record<string, number> = {};

  for (const transferencia of transferencias) {
    contadorPorCuenta[transferencia.cuentaOrigenId] =
      (contadorPorCuenta[transferencia.cuentaOrigenId] ?? 0) + 1;
  }

  let cuentaGanadoraId: string | null = null;
  let mayorCantidad = 0;

  for (const [cuentaId, cantidad] of Object.entries(contadorPorCuenta)) {
    if (cantidad > mayorCantidad) {
      cuentaGanadoraId = cuentaId;
      mayorCantidad = cantidad;
    }
  }

  if (!cuentaGanadoraId) {
    return null;
  }

  const cuenta = cuentas.find((item) => item.id === cuentaGanadoraId);

  if (!cuenta) {
    return null;
  }

  return {
    cuenta,
    cantidad: mayorCantidad,
  };
}

export function obtenerDatosGraficaPorCuentaOrigen(
  transferencias: Transferencia[],
  cuentas: Cuenta[],
): DatoGraficaPorCuentaOrigen[] {
  const acumulado: Record<string, number> = {};

  for (const transferencia of transferencias) {
    acumulado[transferencia.cuentaOrigenId] =
      (acumulado[transferencia.cuentaOrigenId] ?? 0) + transferencia.monto;
  }

  return Object.entries(acumulado).map(([cuentaId, total]) => {
    const cuenta = cuentas.find((item) => item.id === cuentaId);

    return {
      cuentaId,
      nombre: cuenta?.nombreTitular ?? "Desconocida",
      total,
    };
  });
}