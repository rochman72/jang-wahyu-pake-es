export function detectStructure(candles) {
  let highs = candles.map(c => parseFloat(c.high))
  let lows = candles.map(c => parseFloat(c.low))

  if (highs[0] > highs[1]) return "Bullish"
  if (lows[0] < lows[1]) return "Bearish"
  return "Range"
}
