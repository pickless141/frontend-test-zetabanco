export function formatearFecha(fecha: string, locale = "es-PY"): string {
  return new Intl.DateTimeFormat(locale, {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(fecha));
}