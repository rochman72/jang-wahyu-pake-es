export function scoreEngine(structure, liquidity, fvg, session) {
  let score = 0
  if (structure !== "Range") score += 20
  if (liquidity) score += 20
  if (fvg !== "No FVG") score += 20
  if (session !== "Off Session") score += 10
  return score
}
