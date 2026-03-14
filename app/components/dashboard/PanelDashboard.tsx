"use client";

import { useTranslation } from "react-i18next";
import TarjetasResumen from "@/app/components/dashboard/TarjetasResumen";
import GraficaTransferenciasPorCuenta from "@/app/components/dashboard/GraficaTransferenciasPorCuenta";
import WidgetCrypto from "@/app/components/crypto/WidgetCrypto";

export default function PanelDashboard() {
  const { t } = useTranslation();

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-6">
        <h2 className="text-xl font-semibold">{t("dashboard.title")}</h2>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          {t("dashboard.subtitle")}
        </p>
      </div>

      <TarjetasResumen />

      <div className="mt-6">
        <GraficaTransferenciasPorCuenta />
      </div>

      <div className="mt-6">
        <WidgetCrypto />
      </div>
    </section>
  );
}