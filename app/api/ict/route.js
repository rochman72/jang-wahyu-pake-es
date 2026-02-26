import { runICT } from "@/lib/ictEngine"

export async function GET() {
  const key = process.env.TWELVE_API_KEY

  const res = await fetch(
    `https://api.twelvedata.com/time_series?symbol=XAU/USD&interval=15min&outputsize=100&apikey=${key}`,
    { cache: "no-store" }
  )

  const data = await res.json()
  if (!data.values) return Response.json({ error: "Data error" })

  const signal = runICT(data.values)
  return Response.json(signal)
}
