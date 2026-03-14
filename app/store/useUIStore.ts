"use client";

import { create } from "zustand";

interface UIState {
  idioma: "es" | "en";
  setIdioma: (idioma: "es" | "en") => void;
}

export const useUIStore = create<UIState>((set) => ({
  idioma: "es",
  setIdioma: (idioma) => set({ idioma }),
}));