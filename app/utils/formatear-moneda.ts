export function formatearMonedaPYG(valor: number, locale = "es-PY"): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "PYG",
    maximumFractionDigits: 0,
  }).format(valor);
}