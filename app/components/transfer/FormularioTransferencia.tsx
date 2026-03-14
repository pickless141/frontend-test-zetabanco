"use client";

import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import SelectorCuenta from "@/app/components/transfer/SelectorCuenta";
import TarjetaCuentaSeleccionada from "@/app/components/transfer/TarjetaCuentaSeleccionada";
import { crearTransferencia } from "@/app/features/transactions/transferencia.helpers";
import { validarTransferencia } from "@/app/features/transactions/transferencia.validation";
import { useCuentasStore } from "@/app/store/useCuentasStore";
import { useTransferenciasStore } from "@/app/store/useTransferenciasStore";
import { formatearMonedaPYG } from "@/app/utils/formatear-moneda";

export default function FormularioTransferencia() {
  const { t } = useTranslation();

  const cuentas = useCuentasStore((state) => state.cuentas);
  const hidratarCuentas = useCuentasStore((state) => state.hidratarCuentas);
  const obtenerCuentaPorId = useCuentasStore((state) => state.obtenerCuentaPorId);
  const ejecutarTransferenciaLocal = useCuentasStore(
    (state) => state.ejecutarTransferenciaLocal,
  );

  const agregarTransferencia = useTransferenciasStore(
    (state) => state.agregarTransferencia,
  );

  const [cuentaOrigenId, setCuentaOrigenId] = useState("");
  const [cuentaDestinoId, setCuentaDestinoId] = useState("");
  const [monto, setMonto] = useState("");
  const [formularioTocado, setFormularioTocado] = useState(false);

  if (cuentas.length === 0) {
    hidratarCuentas();
  }

  const cuentaOrigen = useMemo(
    () => obtenerCuentaPorId(cuentaOrigenId),
    [cuentaOrigenId, obtenerCuentaPorId],
  );

  const cuentaDestino = useMemo(
    () => obtenerCuentaPorId(cuentaDestinoId),
    [cuentaDestinoId, obtenerCuentaPorId],
  );

  const montoNumerico = Number(monto || 0);
  const montoFormateado = monto ? formatearMonedaPYG(montoNumerico) : "";

  const errorValidacion = validarTransferencia({
    cuentaOrigenId,
    cuentaDestinoId,
    monto: montoNumerico,
    cuentaOrigen,
    t,
  });

  const mostrarError = formularioTocado && Boolean(errorValidacion);

  const formularioIncompleto =
    !cuentaOrigenId || !cuentaDestinoId || !monto.trim();

  const resetFormulario = () => {
    setCuentaOrigenId("");
    setCuentaDestinoId("");
    setMonto("");
    setFormularioTocado(false);
  };

  const handleMontoChange = (value: string) => {
    setFormularioTocado(true);
    const soloDigitos = value.replace(/\D/g, "");
    setMonto(soloDigitos);
  };

  const handleCuentaOrigenChange = (value: string) => {
    setFormularioTocado(true);
    setCuentaOrigenId(value);
  };

  const handleCuentaDestinoChange = (value: string) => {
    setFormularioTocado(true);
    setCuentaDestinoId(value);
  };

  const handleTransferir = () => {
    setFormularioTocado(true);

    if (errorValidacion) {
      toast.error(errorValidacion);
      return;
    }

    if (!cuentaOrigen || !cuentaDestino) {
      toast.error(t("transfer.validation.bothAccounts"));
      return;
    }

    const resultado = ejecutarTransferenciaLocal({
      cuentaOrigenId,
      cuentaDestinoId,
      monto: montoNumerico,
    });

    if (!resultado.ok) {
      toast.error(resultado.error || t("transfer.errorDefault"));
      return;
    }

    const transferencia = crearTransferencia({
      cuentaOrigen,
      cuentaDestino,
      monto: montoNumerico,
    });

    agregarTransferencia(transferencia);
    toast.success(t("transfer.success"));
    resetFormulario();
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-6">
        <h2 className="text-xl font-semibold">{t("transfer.title")}</h2>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          {t("transfer.subtitle")}
        </p>
      </div>

      <div className="grid gap-4">
        <SelectorCuenta
          label={t("transfer.origin")}
          value={cuentaOrigenId}
          onChange={handleCuentaOrigenChange}
          cuentas={cuentas}
        />

        <SelectorCuenta
          label={t("transfer.destination")}
          value={cuentaDestinoId}
          onChange={handleCuentaDestinoChange}
          cuentas={cuentas}
        />

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
            {t("transfer.amount")}
          </span>

          <input
            type="text"
            inputMode="numeric"
            value={montoFormateado}
            onChange={(e) => handleMontoChange(e.target.value)}
            placeholder={t("transfer.amountPlaceholder")}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          />
        </label>

        {mostrarError && (
          <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300">
            {errorValidacion}
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-2">
          <TarjetaCuentaSeleccionada
            titulo={t("transfer.selectedOrigin")}
            cuenta={cuentaOrigen}
          />
          <TarjetaCuentaSeleccionada
            titulo={t("transfer.selectedDestination")}
            cuenta={cuentaDestino}
          />
        </div>

        <button
          type="button"
          onClick={handleTransferir}
          disabled={formularioIncompleto || Boolean(errorValidacion)}
          className="mt-2 inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-300"
        >
          {t("transfer.submit")}
        </button>
      </div>
    </div>
  );
}