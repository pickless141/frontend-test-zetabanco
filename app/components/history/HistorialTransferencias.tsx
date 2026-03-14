"use client";

import { useTranslation } from "react-i18next";
import Paginacion from "../common/Paginacion";
import { formatearFecha } from "@/app/utils/formatear-fecha";
import { formatearMonedaPYG } from "@/app/utils/formatear-moneda";
import { useHistorialTransferencias } from "@/app/hooks/useHistorialTransferencias";

export default function HistorialTransferencias() {
  const { t } = useTranslation();

  const {
    cuentas,
    filtroOrigen,
    filtroDestino,
    filtroMontoBusquedaFormateado,
    paginaActualSegura,
    itemsPorPagina,
    totalPaginas,
    totalTransferidoFiltrado,
    transferenciasPaginadas,
    hayResultados,
    actualizarFiltroOrigen,
    actualizarFiltroDestino,
    actualizarFiltroMontoBusqueda,
    actualizarItemsPorPagina,
    setPaginaActual,
  } = useHistorialTransferencias();

  return (
    <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-col gap-3 border-b border-slate-200 pb-5 dark:border-slate-800 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-xl font-semibold">{t("history.title")}</h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            {t("history.subtitle")}
          </p>
        </div>

        <div className="rounded-xl bg-slate-100 px-4 py-3 text-sm font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200">
          {t("history.filteredTotal")}:{" "}
          {formatearMonedaPYG(totalTransferidoFiltrado)}
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
            {t("history.filterOrigin")}
          </span>
          <select
            value={filtroOrigen}
            onChange={(e) => actualizarFiltroOrigen(e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          >
            <option value="">{t("history.all")}</option>
            {cuentas.map((cuenta) => (
              <option key={cuenta.id} value={cuenta.id}>
                {cuenta.nombreTitular} - {cuenta.numeroCuenta}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
            {t("history.filterDestination")}
          </span>
          <select
            value={filtroDestino}
            onChange={(e) => actualizarFiltroDestino(e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          >
            <option value="">{t("history.all")}</option>
            {cuentas.map((cuenta) => (
              <option key={cuenta.id} value={cuenta.id}>
                {cuenta.nombreTitular} - {cuenta.numeroCuenta}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
            {t("history.filterMinAmount")}
          </span>
          <input
            type="text"
            inputMode="numeric"
            value={filtroMontoBusquedaFormateado}
            onChange={(e) => actualizarFiltroMontoBusqueda(e.target.value)}
            placeholder={t("history.minAmountPlaceholder")}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
            {t("history.rowsPerPage")}
          </span>
          <select
            value={itemsPorPagina}
            onChange={(e) => actualizarItemsPorPagina(Number(e.target.value))}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
          </select>
        </label>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
        {hayResultados ? (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
                <thead className="bg-slate-50 dark:bg-slate-950">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                      {t("history.date")}
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                      {t("history.origin")}
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                      {t("history.destination")}
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                      {t("history.amount")}
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-200 bg-white dark:divide-slate-800 dark:bg-slate-900">
                  {transferenciasPaginadas.map((transferencia) => (
                    <tr key={transferencia.id}>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 dark:text-slate-300">
                        {formatearFecha(transferencia.fecha)}
                      </td>
                      <td className="px-4 py-4 text-sm font-medium text-slate-900 dark:text-slate-100">
                        {transferencia.nombreCuentaOrigen}
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-700 dark:text-slate-300">
                        {transferencia.nombreCuentaDestino}
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-right text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                        {formatearMonedaPYG(transferencia.monto)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="border-t border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-4 text-center text-sm text-slate-600 dark:text-slate-400">
                {t("history.page")} {paginaActualSegura} {t("history.of")}{" "}
                {totalPaginas}
              </div>

              <Paginacion
                paginaActual={paginaActualSegura}
                totalPaginas={totalPaginas}
                onCambiarPagina={setPaginaActual}
              />
            </div>
          </>
        ) : (
          <div className="px-4 py-10 text-center text-sm text-slate-500 dark:text-slate-400">
            {t("history.empty")}
          </div>
        )}
      </div>
    </section>
  );
}