import { ArrowLeftRight, History, LayoutDashboard } from "lucide-react";

export const STORAGE_KEYS = {
  CUENTAS: "zeta-cuentas",
  LANGUAGE: "zeta-language",
  TRANSFERENCIAS: "zeta-transferencias",
} as const;

export const NAV_LINKS = [
  {
    href: "/",
    translationKey: "nav.dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/transferencias",
    translationKey: "nav.transfers",
    icon: ArrowLeftRight,
  },
  {
    href: "/historial",
    translationKey: "nav.history",
    icon: History,
  },
] as const;

export const CRYPTO_SYMBOLS = [
  "BINANCE:BTCUSDT",
  "BINANCE:ETHUSDT",
  "BINANCE:SOLUSDT",
] as const;