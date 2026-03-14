"use client";

import { useTranslation } from "react-i18next";
import { I18N_STORAGE_KEY } from "@/app/i18n/config";

export default function ToggleIdioma() {
  const { i18n } = useTranslation();

  const idiomaActual: "es" | "en" = i18n.language.startsWith("en") ? "en" : "es";

  const cambiarIdioma = (idioma: "es" | "en") => {
    i18n.changeLanguage(idioma);
    window.localStorage.setItem(I18N_STORAGE_KEY, idioma);
  };

  return (
    <div className="inline-flex overflow-hidden rounded-xl border border-slate-300 dark:border-slate-700">
      <button
        type="button"
        onClick={() => cambiarIdioma("es")}
        className={`px-3 py-2 text-sm font-medium transition ${
          idiomaActual === "es"
            ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
            : "bg-white text-slate-700 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
        }`}
      >
        ES
      </button>
      <button
        type="button"
        onClick={() => cambiarIdioma("en")}
        className={`px-3 py-2 text-sm font-medium transition ${
          idiomaActual === "en"
            ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
            : "bg-white text-slate-700 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
        }`}
      >
        EN
      </button>
    </div>
  );
}