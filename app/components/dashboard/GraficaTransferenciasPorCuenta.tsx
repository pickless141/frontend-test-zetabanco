"use client";

import { useMemo } from "react";
import { useTheme } from "next-themes";
import { useTranslation } from "react-i18next";
import { useTransferenciasStore } from "@/app/store/useTransferenciasStore";
import { useCuentasStore } from "@/app/store/useCuentasStore";
import {
  obtenerDatosGraficaPorCuentaOrigen,
  obtenerTransferenciasDelDia,
} from "@/app/features/transactions/transferencia.metricas";
import {
  BarChart,
  Bar,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function GraficaTransferenciasPorCuenta() {
  const { t, i18n } = useTranslation();
  const { resolvedTheme } = useTheme();

  const transferencias = useTransferenciasStore((state) => state.transferencias);
  const cuentas = useCuentasStore((state) => state.cuentas);

  const data = useMemo(() => {
    const transferenciasDelDia = obtenerTransferenciasDelDia(transferencias);
    return obtenerDatosGraficaPorCuentaOrigen(transferenciasDelDia, cuentas);
  }, [transferencias, cuentas]);

  const esOscuro = resolvedTheme === "dark";
  const locale = i18n.language.startsWith("en") ? "en-US" : "es-PY";

  const formatearMoneda = (valor: number): string =>
    new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "PYG",
      maximumFractionDigits: 0,
    }).format(valor);

  const chartColors = useMemo(
    () => ({
      bar: esOscuro ? "#38bdf8" : "#2563eb",
      barHover: esOscuro ? "#7dd3fc" : "#1d4ed8",
      grid: esOscuro ? "#334155" : "#cbd5e1",
      axis: esOscuro ? "#cbd5e1" : "#64748b",
      tooltipBg: esOscuro ? "#0f172a" : "#ffffff",
      tooltipBorder: esOscuro ? "#334155" : "#cbd5e1",
      tooltipText: esOscuro ? "#f8fafc" : "#0f172a",
    }),
    [esOscuro],
  );

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950/40">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
          {t("chart.title")}
        </h3>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          {t("chart.subtitle")}
        </p>
      </div>

      {data.length > 0 ? (
        <div className="h-72 w-full sm:h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 12, right: 8, left: 0, bottom: 48 }}
              barCategoryGap="28%"
            >
              <CartesianGrid
                stroke={chartColors.grid}
                strokeDasharray="4 4"
                vertical={false}
              />

              <XAxis
                dataKey="nombre"
                tickLine={false}
                axisLine={false}
                fontSize={11}
                tick={{ fill: chartColors.axis }}
                interval={0}
                angle={-25}
                textAnchor="end"
                height={60}
              />

              <YAxis
                tickFormatter={(value) =>
                  new Intl.NumberFormat(locale, {
                    notation: "compact",
                    maximumFractionDigits: 1,
                  }).format(Number(value ?? 0))
                }
                tickLine={false}
                axisLine={false}
                fontSize={11}
                tick={{ fill: chartColors.axis }}
                width={44}
              />

              <Tooltip
                cursor={{
                  fill: esOscuro
                    ? "rgba(148,163,184,0.08)"
                    : "rgba(148,163,184,0.10)",
                }}
                contentStyle={{
                  backgroundColor: chartColors.tooltipBg,
                  borderColor: chartColors.tooltipBorder,
                  borderRadius: 14,
                  color: chartColors.tooltipText,
                  boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
                }}
                labelStyle={{
                  color: chartColors.tooltipText,
                  fontWeight: 600,
                  marginBottom: 6,
                }}
                formatter={(value) => {
                  const monto =
                    typeof value === "number" ? value : Number(value ?? 0);

                  return [formatearMoneda(monto), t("chart.totalLabel")];
                }}
                labelFormatter={(label) =>
                  `${t("chart.accountLabel")}: ${String(label)}`
                }
              />

              <Bar
                dataKey="total"
                fill={chartColors.bar}
                activeBar={{ fill: chartColors.barHover }}
                radius={[10, 10, 0, 0]}
                maxBarSize={64}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="flex h-60 items-center justify-center rounded-xl border border-dashed border-slate-300 text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
          {t("chart.empty")}
        </div>
      )}
    </div>
  );
}