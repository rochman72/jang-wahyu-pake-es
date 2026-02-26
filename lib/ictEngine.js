import { detectStructure } from "./structure"
import { detectLiquidity } from "./liquidity"
import { detectFVG } from "./fvg"
import { sessionFilter } from "./session"
import { scoreEngine } from "./scoring"

export function runICT(candles) {
  const structure = detectStructure(candles)
  const liquidity = detectLiquidity(candles)
  const fvg = detectFVG(candles)
  const session = sessionFilter()

  const current = parseFloat(candles[0].close)
  const high = parseFloat(candles[0].high)
  const low = parseFloat(candles[0].low)

  let entry = current
  let sl = structure === "Bullish" ? low : high
  let tp = structure === "Bullish"
    ? current + (current - low) * 3
    : current - (high - current) * 3

  const rr = Math.abs(tp - entry) / Math.abs(entry - sl)
  const probability = scoreEngine(structure, liquidity, fvg, session)

  return {
    pair: "XAU/USD",
    structure,
    liquidity,
    fvg,
    session,
    entry,
    sl,
    tp,
    rr: rr.toFixed(2),
    probability: probability + "%"
  }
}
