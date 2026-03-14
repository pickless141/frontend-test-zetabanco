export type TipoCuenta =
  | "Caja de ahorro"
  | "Cuenta corriente"
  | "Cuenta sueldo";

export type MonedaCuenta = "PYG";

export interface Cuenta {
  id: string;
  numeroCuenta: string;
  tipo: TipoCuenta;
  banco: string;
  nombreTitular: string;
  saldo: number;
  moneda: MonedaCuenta;
  foto: string;
}