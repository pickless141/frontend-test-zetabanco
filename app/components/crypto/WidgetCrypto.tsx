"use client";

import Image from "next/image";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Wifi, WifiOff } from "lucide-react";
import { CRYPTO_SYMBOLS } from "@/app/lib/constants";
import {
  formatearHoraTicker,
  formatearNombreSimbolo,
  formatearPrecioCrypto,
} from "@/app/features/market/crypto.helpers";
import { obtenerIconoCrypto } from "@/app/helpers/cryptoIcons.helpers";
import { useCryptoMarket } from "@/app/features/market/useCryptoMarket";
import { useCryptoStore } from "@/app/store/useCryptoStore";
import type { CryptoTicker } from "@/app/types/crypto.types";

export default function WidgetCrypto() {
  const { t, i18n } = useTranslation();

  const tickers = useCryptoStore((state) => state.tickers);
  const conectado = useCryptoStore((state) => state.conectado);

  useCryptoMarket();

  const locale = i18n.language.startsWith("en") ? "en-US" : "es-PY";

  const listaTickers = useMemo<CryptoTicker[]>(() => {
    return CRYPTO_SYMBOLS
      .map((symbol) => tickers[symbol])
      .filter((ticker): ticker is CryptoTicker => ticker !== undefined);
  }, [tickers]);

  const tieneApiKey = Boolean(process.env.NEXT_PUBLIC_FINNHUB_API_KEY);

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950/40">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
            {t("crypto.title")}
          </h3>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {t("crypto.subtitle")}
          </p>
        </div>

        <div
          className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${
            conectado
              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400"
              : "bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400"
          }`}
        >
          {conectado ? <Wifi size={14} /> : <WifiOff size={14} />}
          {conectado ? t("crypto.connected") : t("crypto.disconnected")}
        </div>
      </div>

      {!tieneApiKey ? (
        <div className="flex h-40 items-center justify-center rounded-xl border border-dashed border-amber-300 bg-amber-50 px-4 text-center text-sm text-amber-700 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-300">
          {t("crypto.missingKey")}
        </div>
      ) : listaTickers.length > 0 ? (
        <div className="space-y-3">
          {listaTickers.map((ticker) => (
            <div
              key={ticker.simbolo}
              className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
                  <Image
                    src={obtenerIconoCrypto(ticker.simbolo)}
                    alt={formatearNombreSimbolo(ticker.simbolo)}
                    width={22}
                    height={22}
                  />
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {formatearNombreSimbolo(ticker.simbolo)}
                  </p>
                  <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                    {ticker.simbolo}
                  </p>
                </div>
              </div>

              <div className="text-left sm:text-right">
                <p className="wrap-break-word text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {formatearPrecioCrypto(ticker.precio, locale)}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {formatearHoraTicker(ticker.timestamp, locale)}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex h-40 items-center justify-center rounded-xl border border-dashed border-slate-300 text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
          {t("crypto.waiting")}
        </div>
      )}
    </div>
  );
}