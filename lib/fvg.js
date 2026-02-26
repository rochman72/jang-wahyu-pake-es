export function detectFVG(candles) {
  for (let i = 2; i < candles.length; i++) {
    const c1 = candles[i]
    const c3 = candles[i-2]

    if (parseFloat(c1.high) < parseFloat(c3.low))
      return "Bullish FVG"

    if (parseFloat(c1.low) > parseFloat(c3.high))
      return "Bearish FVG"
  }
  return "No FVG"
}
