import { formatCurrency, formatCurrencyNoSign } from ".";

test("formatCurrency and formatCurrencyNoSign should produce the same output except for the currency sign", () => {
  const amount = 23.34;

  const formattedWithSign = formatCurrency(amount);
  const formattedWithoutSign = formatCurrencyNoSign(amount);

  expect(formattedWithSign.replace(/[^\d.]/g, "")).toBe(formattedWithoutSign);
});
