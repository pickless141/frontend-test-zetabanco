import type { TFunction } from "i18next";

export type InformacionSeccion = {
  titulo: string;
  subtitulo: string;
};

export function obtenerInformacionSeccion(
  pathname: string,
  t: TFunction,
): InformacionSeccion {
  const secciones: Record<string, InformacionSeccion> = {
    "/transferencias": {
      titulo: t("section.transfersTitle"),
      subtitulo: t("section.transfersSubtitle"),
    },
    "/historial": {
      titulo: t("section.historyTitle"),
      subtitulo: t("section.historySubtitle"),
    },
  };

  return (
    secciones[pathname] ?? {
      titulo: t("section.dashboardTitle"),
      subtitulo: t("section.dashboardSubtitle"),
    }
  );
}