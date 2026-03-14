"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import esCommon from "@/app/i18n/locales/es/common.json";
import enCommon from "@/app/i18n/locales/en/common.json";

const resources = {
  es: {
    translation: esCommon,
  },
  en: {
    translation: enCommon,
  },
};

const STORAGE_KEY = "zeta-language";

function obtenerIdiomaInicial() {
  if (typeof window === "undefined") return "es";

  const idiomaGuardado = window.localStorage.getItem(STORAGE_KEY);
  if (idiomaGuardado === "es" || idiomaGuardado === "en") {
    return idiomaGuardado;
  }

  return "es";
}

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng: obtenerIdiomaInicial(),
    fallbackLng: "es",
    interpolation: {
      escapeValue: false,
    },
  });
}

export { STORAGE_KEY as I18N_STORAGE_KEY };
export default i18n;