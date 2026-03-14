export function obtenerIconoCrypto(simbolo: string): string {
  const limpio = simbolo.replace("BINANCE:", "").replace("USDT", "");

  switch (limpio) {
    case "BTC":
      return "/crypto/btc.svg";
    case "ETH":
      return "/crypto/eth.svg";
    case "SOL":
      return "/crypto/sol.svg";
    default:
      return "/crypto/default.svg";
  }
}