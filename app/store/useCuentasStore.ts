"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import cuentasMock from "../mocks/cuentas.json";
import { STORAGE_KEYS } from "../lib/constants";
import type { Cuenta } from "../types/cuenta.types";

interface EjecutarTransferenciaParams {
  cuentaOrigenId: string;
  cuentaDestinoId: string;
  monto: number;
}

type ResultadoTransferencia =
  | { ok: true }
  | { ok: false; error: string };

interface CuentasState {
  cuentas: Cuenta[];
  hidratarCuentas: () => void;
  obtenerCuentaPorId: (id: string) => Cuenta | undefined;
  ejecutarTransferenciaLocal: (
    params: EjecutarTransferenciaParams,
  ) => ResultadoTransferencia;
  resetearCuentas: () => void;
}

const CUENTAS_INICIALES: Cuenta[] = cuentasMock as Cuenta[];

const obtenerCuentasIniciales = (): Cuenta[] =>
  CUENTAS_INICIALES.map((cuenta) => ({ ...cuenta }));

export const useCuentasStore = create<CuentasState>()(
  persist(
    (set, get) => ({
      cuentas: [],

      hidratarCuentas: () => {
        if (get().cuentas.length > 0) return;

        set({
          cuentas: obtenerCuentasIniciales(),
        });
      },

      obtenerCuentaPorId: (id) =>
        get().cuentas.find((cuenta) => cuenta.id === id),

      ejecutarTransferenciaLocal: ({
        cuentaOrigenId,
        cuentaDestinoId,
        monto,
      }) => {
        const cuentas = get().cuentas;

        const cuentaOrigen = cuentas.find(
          (cuenta) => cuenta.id === cuentaOrigenId,
        );
        const cuentaDestino = cuentas.find(
          (cuenta) => cuenta.id === cuentaDestinoId,
        );

        if (!cuentaOrigen) {
          return { ok: false, error: "La cuenta origen no existe." };
        }

        if (!cuentaDestino) {
          return { ok: false, error: "La cuenta destino no existe." };
        }

        if (cuentaOrigen.id === cuentaDestino.id) {
          return {
            ok: false,
            error: "La cuenta destino no puede ser la misma que la de origen.",
          };
        }

        if (monto <= 0) {
          return { ok: false, error: "El monto debe ser mayor a cero." };
        }

        if (cuentaOrigen.saldo < monto) {
          return {
            ok: false,
            error: "Saldo insuficiente en la cuenta origen.",
          };
        }

        const cuentasActualizadas = cuentas.map((cuenta) => {
          if (cuenta.id === cuentaOrigenId) {
            return {
              ...cuenta,
              saldo: cuenta.saldo - monto,
            };
          }

          if (cuenta.id === cuentaDestinoId) {
            return {
              ...cuenta,
              saldo: cuenta.saldo + monto,
            };
          }

          return cuenta;
        });

        set({ cuentas: cuentasActualizadas });

        return { ok: true };
      },

      resetearCuentas: () => {
        set({
          cuentas: obtenerCuentasIniciales(),
        });
      },
    }),
    {
      name: STORAGE_KEYS.CUENTAS,
      partialize: (state) => ({
        cuentas: state.cuentas,
      }),
    },
  ),
);