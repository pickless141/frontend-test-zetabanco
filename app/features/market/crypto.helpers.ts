import type { CryptoTicker, FinnhubTradeItem } from "@/app/types/crypto.types";

export function mapearTradeACryptoTicker(trade: FinnhubTradeItem): CryptoTicker {
  return {
    simbolo: trade.s,
    precio: trade.p,
    timestamp: trade.t,
    volumen: trade.v,
  };
}

export function formatearNombreSimbolo(simbolo: string): string {
  return simbolo.replace("BINANCE:", "").replace("USDT", "");
}

export function formatearPrecioCrypto(precio: number, locale = "en-US"): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(precio);
}

export function formatearHoraTicker(timestamp: number, locale = "es-PY"): string {
  return new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(new Date(timestamp));
}