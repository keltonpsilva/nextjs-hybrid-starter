interface FormatCurrencyOptions {
  showDecimal?: boolean;
  currency?: string;
}

/**
 * It gets an amount and currency as an input and it converts it to the correct money value.
 * Returns 'null' if the input is null.
 *
 * @param {number | null} amount
 * @param {FormatCurrencyOptions} options
 * @return {string}
 */
const formatCurrency = (
  amount: number | null | undefined,
  options: FormatCurrencyOptions = {}
): string | null => {
  const { showDecimal = true, currency = "GBP" } = options;

  if (amount) {
    const formatOptions: Intl.NumberFormatOptions = {
      style: "currency",
      currency,
    };

    if (!showDecimal) {
      formatOptions.minimumFractionDigits = 0;
    }

    const formatter = new Intl.NumberFormat("en-GB", formatOptions);
    return formatter.format(amount);
  }
  return "-";
};

export default formatCurrency;
