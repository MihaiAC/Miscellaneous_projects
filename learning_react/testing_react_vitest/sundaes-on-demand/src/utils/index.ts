export function formatCurrency(currency: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(currency);
}

export function formatCurrencyNoSign(currency: number) {
  return currency.toFixed(2);
}
