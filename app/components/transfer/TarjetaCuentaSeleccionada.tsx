"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";
import type { Cuenta } from "@/app/types/cuenta.types";
import { formatearMonedaPYG } from "@/app/utils/formatear-moneda";

interface TarjetaCuentaSeleccionadaProps {
  titulo: string;
  cuenta?: Cuenta;
}

export default function TarjetaCuentaSeleccionada({
  titulo,
  cuenta,
}: TarjetaCuentaSeleccionadaProps) {
  const { t } = useTranslation();

  const foto = cuenta?.foto;
  const nombreTitular = cuenta?.nombreTitular;
  const tipo = cuenta?.tipo;
  const numeroCuenta = cuenta?.numeroCuenta;
  const saldo = cuenta?.saldo;

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/40">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
        {titulo}
      </p>

      {cuenta ? (
        <div className="mt-4 flex items-center gap-4">
          <div className="relative h-14 w-14 overflow-hidden rounded-full border border-slate-200 dark:border-slate-700">
            <Image
              src={foto ?? ""}
              alt={nombreTitular ?? "Cuenta seleccionada"}
              fill
              className="object-cover"
              sizes="56px"
            />
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-900 dark:text-slate-100">
              {nombreTitular}
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400">{tipo}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {numeroCuenta}
            </p>
            <p className="mt-1 text-sm font-medium text-emerald-700 dark:text-emerald-400">
              {formatearMonedaPYG(saldo ?? 0)}
            </p>
          </div>
        </div>
      ) : (
        <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
          {t("transfer.noAccountSelected")}
        </p>
      )}
    </div>
  );
}