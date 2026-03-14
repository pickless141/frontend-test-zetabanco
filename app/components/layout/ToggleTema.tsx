"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useTranslation } from "react-i18next";

export default function ToggleTema() {
  const { resolvedTheme, setTheme } = useTheme();
  const { t } = useTranslation();

  const esOscuro = resolvedTheme === "dark";
  const isThemeResolved = resolvedTheme !== undefined;

  return (
    <button
      type="button"
      onClick={() => {
        if (!isThemeResolved) return;
        setTheme(esOscuro ? "light" : "dark");
      }}
      className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
      aria-label="Cambiar tema"
    >
      {!isThemeResolved ? (
        "Tema"
      ) : esOscuro ? (
        <>
          <Sun size={16} />
          {t("theme.light")}
        </>
      ) : (
        <>
          <Moon size={16} />
          {t("theme.dark")}
        </>
      )}
    </button>
  );
}