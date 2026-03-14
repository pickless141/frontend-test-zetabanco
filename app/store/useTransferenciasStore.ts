"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { STORAGE_KEYS } from "../lib/constants";
import type { Transferencia } from "../types/transferencia.types";

interface TransferenciasState {
  transferencias: Transferencia[];
  agregarTransferencia: (transferencia: Transferencia) => void;
  limpiarTransferencias: () => void;
}

export const useTransferenciasStore = create<TransferenciasState>()(
  persist(
    (set) => ({
      transferencias: [],

      agregarTransferencia: (transferencia) =>
        set((state) => ({
          transferencias: [transferencia, ...state.transferencias],
        })),

      limpiarTransferencias: () => set({ transferencias: [] }),
    }),
    {
      name: STORAGE_KEYS.TRANSFERENCIAS,
    },
  ),
);