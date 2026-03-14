"use client";

import { useMemo, useState } from "react";
import { useTransferenciasStore } from "@/app/store/useTransferenciasStore";
import { useCuentasStore } from "@/app/store/useCuentasStore";
import {
  calcularTotalTransferido,
  obtenerTransferenciasDelDia,
} from "@/app/features/transactions/transferencia.metricas";
import { formatearMonedaPYG } from "@/app/utils/formatear-moneda";

export function useHistorialTransferencias() {
  const transferencias = useTransferenciasStore((state) => state.transferencias);
  const cuentas = useCuentasStore((state) => state.cuentas);

  const [filtroOrigen, setFiltroOrigen] = useState("");
  const [filtroDestino, setFiltroDestino] = useState("");
  const [filtroMontoBusqueda, setFiltroMontoBusqueda] = useState("");

  const [paginaActual, setPaginaActual] = useState(1);
  const [itemsPorPagina, setItemsPorPagina] = useState(5);

  const transferenciasDelDia = useMemo(
    () => obtenerTransferenciasDelDia(transferencias),
    [transferencias],
  );

  const filtroMontoBusquedaFormateado = filtroMontoBusqueda
    ? formatearMonedaPYG(Number(filtroMontoBusqueda))
    : "";

  const transferenciasFiltradas = useMemo(() => {
    return transferenciasDelDia.filter((transferencia) => {
      const coincideOrigen = filtroOrigen
        ? transferencia.cuentaOrigenId === filtroOrigen
        : true;

      const coincideDestino = filtroDestino
        ? transferencia.cuentaDestinoId === filtroDestino
        : true;

      const coincideMonto = filtroMontoBusqueda.trim() !== ""
        ? String(Math.trunc(transferencia.monto)).includes(filtroMontoBusqueda)
        : true;

      return coincideOrigen && coincideDestino && coincideMonto;
    });
  }, [transferenciasDelDia, filtroOrigen, filtroDestino, filtroMontoBusqueda]);

  const totalTransferidoFiltrado = useMemo(
    () => calcularTotalTransferido(transferenciasFiltradas),
    [transferenciasFiltradas],
  );

  const totalPaginas = Math.max(
    1,
    Math.ceil(transferenciasFiltradas.length / itemsPorPagina),
  );

  const paginaActualSegura = Math.min(paginaActual, totalPaginas);

  const transferenciasPaginadas = useMemo(() => {
    const indiceInicio = (paginaActualSegura - 1) * itemsPorPagina;
    const indiceFin = indiceInicio + itemsPorPagina;

    return transferenciasFiltradas.slice(indiceInicio, indiceFin);
  }, [transferenciasFiltradas, paginaActualSegura, itemsPorPagina]);

  const actualizarFiltroOrigen = (value: string) => {
    setFiltroOrigen(value);
    setPaginaActual(1);
  };

  const actualizarFiltroDestino = (value: string) => {
    setFiltroDestino(value);
    setPaginaActual(1);
  };

  const actualizarFiltroMontoBusqueda = (value: string) => {
    const soloDigitos = value.replace(/\D/g, "");
    setFiltroMontoBusqueda(soloDigitos);
    setPaginaActual(1);
  };

  const actualizarItemsPorPagina = (value: number) => {
    setItemsPorPagina(value);
    setPaginaActual(1);
  };

  const hayResultados = transferenciasFiltradas.length > 0;

  return {
    cuentas,
    filtroOrigen,
    filtroDestino,
    filtroMontoBusqueda,
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
  };
}