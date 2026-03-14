"use client";

import { useEffect } from "react";
import { crearSocketCrypto } from "@/app/api/crypto.api";
import { mapearTradeACryptoTicker } from "@/app/features/market/crypto.helpers";
import { useCryptoStore } from "@/app/store/useCryptoStore";

export function useCryptoMarket() {
  const { setConectado, actualizarTicker } = useCryptoStore();

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_FINNHUB_API_KEY;

    if (!apiKey) {
      setConectado(false);
      return;
    }

    const socket = crearSocketCrypto({
      apiKey,
      onOpen: () => setConectado(true),
      onClose: () => setConectado(false),
      onError: () => setConectado(false),
      onMessage: (message) => {
        if (message.type !== "trade" || !message.data?.length) return;

        message.data.forEach((trade) => {
          actualizarTicker(mapearTradeACryptoTicker(trade));
        });
      },
    });

    return () => {
      socket.close();
    };
  }, [actualizarTicker, setConectado]);
}