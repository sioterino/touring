const formatNumber = (num: number): string => {
  return num.toLocaleString("en-US").replaceAll(',', ' ')
}

const formatUSD = (num: number): string => {
  let formatted = num.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  })

  formatted = formatted.charAt(0) + ' ' + formatted.slice(1);

  return formatted.replace(/\.00$/, "")
}

const formatPercentage = (num: number): string => {
  return (num * 100).toFixed(2) + "%";
}

export { formatNumber, formatUSD, formatPercentage }