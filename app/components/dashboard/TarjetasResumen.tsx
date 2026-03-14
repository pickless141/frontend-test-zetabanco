"use client";

import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useTransferenciasStore } from "@/app/store/useTransferenciasStore";
import { useCuentasStore } from "@/app/store/useCuentasStore";
import {
  calcularTotalTransferido,
  calcularTotalTransacciones,
  obtenerCuentaConMasTransferencias,
  obtenerTransferenciasDelDia,
} from "@/app/features/transactions/transferencia.metricas";
import { formatearMonedaPYG } from "@/app/utils/formatear-moneda";

interface TarjetaMetricaProps {
  titulo: string;
  valor: string;
  descripcion: string;
}

function TarjetaMetrica({
  titulo,
  valor,
  descripcion,
}: TarjetaMetricaProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/40">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
        {titulo}
      </p>
      <p className="mt-3 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
        {valor}
      </p>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        {descripcion}
      </p>
    </div>
  );
}

export default function TarjetasResumen() {
  const { t } = useTranslation();

  const transferencias = useTransferenciasStore((state) => state.transferencias);
  const cuentas = useCuentasStore((state) => state.cuentas);

  const transferenciasDelDia = useMemo(
    () => obtenerTransferenciasDelDia(transferencias),
    [transferencias],
  );

  const totalTransacciones = useMemo(
    () => calcularTotalTransacciones(transferenciasDelDia),
    [transferenciasDelDia],
  );

  const totalTransferido = useMemo(
    () => calcularTotalTransferido(transferenciasDelDia),
    [transferenciasDelDia],
  );

  const cuentaConMasTransferencias = useMemo(
    () => obtenerCuentaConMasTransferencias(transferenciasDelDia, cuentas),
    [transferenciasDelDia, cuentas],
  );

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <TarjetaMetrica
        titulo={t("dashboard.totalTransactions")}
        valor={String(totalTransacciones)}
        descripcion={t("dashboard.totalTransactionsDesc")}
      />

      <TarjetaMetrica
        titulo={t("dashboard.totalTransferred")}
        valor={formatearMonedaPYG(totalTransferido)}
        descripcion={t("dashboard.totalTransferredDesc")}
      />

      <TarjetaMetrica
        titulo={t("dashboard.topAccount")}
        valor={
          cuentaConMasTransferencias
            ? cuentaConMasTransferencias.cuenta.nombreTitular
            : t("dashboard.noData")
        }
        descripcion={
          cuentaConMasTransferencias
            ? t("dashboard.topAccountDesc", {
                count: cuentaConMasTransferencias.cantidad,
              })
            : t("dashboard.topAccountEmpty")
        }
      />
    </div>
  );
}