export interface CryptoTicker {
  simbolo: string;
  precio: number;
  timestamp: number;
  volumen?: number;
}

export interface FinnhubTradeItem {
  p: number;
  s: string;
  t: number;
  v: number;
}

export interface FinnhubMessage {
  type: string;
  data?: FinnhubTradeItem[];
}