export interface Transferencia {
  id: string;
  cuentaOrigenId: string;
  cuentaDestinoId: string;
  nombreCuentaOrigen: string;
  nombreCuentaDestino: string;
  monto: number;
  fecha: string;
}