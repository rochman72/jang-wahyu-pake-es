export function sessionFilter() {
  const hour = new Date().getUTCHours()
  if (hour >= 7 && hour <= 10) return "London"
  if (hour >= 13 && hour <= 16) return "New York"
  return "Off Session"
}
