"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import ToggleIdioma from "@/app/components/layout/ToggleIdioma";
import { obtenerInformacionSeccion } from "@/app/helpers/encabezado.helpers";

const ToggleTema = dynamic(
  () => import("@/app/components/layout/ToggleTema"),
  { ssr: false }
);

export default function EncabezadoPagina() {
  const { t } = useTranslation();
  const pathname = usePathname();

  const informacionSeccion = obtenerInformacionSeccion(pathname, t);

  return (
    <header className="mb-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="relative h-12 w-45 sm:h-14 sm:w-55">
            <Image
              src="https://www.zbanco.com.py/static/media/brand-primary.5f81cd4a02d2d2092696.png"
              alt="Banco Zeta"
              fill
              priority
              className="object-contain object-left"
            />
          </div>

          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            {t("header.title")}
          </h1>

          <p className="mt-3 max-w-2xl text-sm text-slate-600 dark:text-slate-400 sm:text-base">
            {t("header.subtitle")}
          </p>

          <div className="mt-5 rounded-2xl border border-slate-200 bg-white/70 px-4 py-4 dark:border-slate-800 dark:bg-slate-900/70">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              {informacionSeccion.titulo}
            </h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              {informacionSeccion.subtitulo}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 self-start">
          <ToggleIdioma />
          <ToggleTema />
        </div>
      </div>
    </header>
  );
}