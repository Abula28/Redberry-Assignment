export function formatNumber(number: number) {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    useGrouping: true,
  })
    .format(number)
    .replace(/,/g, " ");
}
