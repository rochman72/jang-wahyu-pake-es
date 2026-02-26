export function detectLiquidity(candles) {
  for (let i = 2; i < candles.length; i++) {
    const h1 = parseFloat(candles[i].high)
    const h2 = parseFloat(candles[i-1].high)
    if (Math.abs(h1 - h2) < 0.2) return true
  }
  return false
}
