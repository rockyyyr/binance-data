const round = (value, decimals) => Number(Math.round(value+'e'+decimals)+'e-'+decimals)
const change = (open, close) => round((close - open) / open, 8)
const target = (price, change) => round(price + (price * change), 8)
const percent = num => num / 100

module.exports = {
  change,
  target,
  percent
}
