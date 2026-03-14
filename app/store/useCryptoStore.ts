"use client";

import { create } from "zustand";
import type { CryptoTicker } from "@/app/types/crypto.types";

interface CryptoState {
  tickers: Record<string, CryptoTicker>;
  conectado: boolean;
  setConectado: (conectado: boolean) => void;
  actualizarTicker: (ticker: CryptoTicker) => void;
  limpiarTickers: () => void;
}

export const useCryptoStore = create<CryptoState>((set) => ({
  tickers: {},
  conectado: false,

  setConectado: (conectado) => set({ conectado }),

  actualizarTicker: (ticker) =>
    set((state) => ({
      tickers: {
        ...state.tickers,
        [ticker.simbolo]: ticker,
      },
    })),

  limpiarTickers: () => set({ tickers: {} }),
}));