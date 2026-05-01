export const currency = (value: number): string =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

export const signedPercent = (value: number): string => `${value >= 0 ? "+" : ""}${value.toFixed(1)}%`;
