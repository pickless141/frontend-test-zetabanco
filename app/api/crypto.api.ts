import { CRYPTO_SYMBOLS } from "../lib/constants";
import type { FinnhubMessage } from "@/app/types/crypto.types";

interface CrearSocketCryptoParams {
  apiKey: string;
  onOpen?: () => void;
  onClose?: () => void;
  onError?: () => void;
  onMessage?: (message: FinnhubMessage) => void;
}

function parsearMensajeSocket(data: string): FinnhubMessage | null {
  try {
    return JSON.parse(data) as FinnhubMessage;
  } catch {
    return null;
  }
}

export function crearSocketCrypto({
  apiKey,
  onOpen,
  onClose,
  onError,
  onMessage,
}: CrearSocketCryptoParams): WebSocket {
  const socket = new WebSocket(`wss://ws.finnhub.io?token=${apiKey}`);

  socket.onopen = () => {
    CRYPTO_SYMBOLS.forEach((symbol) => {
      socket.send(JSON.stringify({ type: "subscribe", symbol }));
    });

    onOpen?.();
  };

  socket.onmessage = (event: MessageEvent<string>) => {
    const message = parsearMensajeSocket(event.data);

    if (!message) {
      return;
    }

    onMessage?.(message);
  };

  socket.onerror = () => {
    onError?.();
  };

  socket.onclose = () => {
    onClose?.();
  };

  return socket;
}