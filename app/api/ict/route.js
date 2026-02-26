import { readDB, writeDB } from "@/lib/db"

export async function GET() {

  const db = readDB()

  // Kalau ada trade aktif, cek TP/SL
  if (db.activeTrade) {

    const res = await fetch(
      `https://api.twelvedata.com/price?symbol=XAU/USD&apikey=${process.env.TWELVE_API}`
    )

    const priceData = await res.json()
    const current = parseFloat(priceData.price)

    const trade = db.activeTrade

    if (
      (trade.structure === "Bullish" && current >= trade.tp) ||
      (trade.structure === "Bearish" && current <= trade.tp)
    ) {
      db.stats.win += 1
      trade.result = "WIN"
      db.history.push(trade)
      db.activeTrade = null
      writeDB(db)
    }

    else if (
      (trade.structure === "Bullish" && current <= trade.sl) ||
      (trade.structure === "Bearish" && current >= trade.sl)
    ) {
      db.stats.loss += 1
      trade.result = "LOSS"
      db.history.push(trade)
      db.activeTrade = null
      writeDB(db)
    }

    return Response.json(db.activeTrade || { message:"Trade Closed" })
  }

  // Kalau tidak ada trade aktif → buat signal baru

  const res = await fetch(
    `https://api.twelvedata.com/time_series?symbol=XAU/USD&interval=15min&apikey=${process.env.TWELVE_API}`
  )

  const data = await res.json()
  const candle = data.values[1]

  const high = parseFloat(candle.high)
  const low = parseFloat(candle.low)
  const close = parseFloat(candle.close)

  const bullish = close > (high + low) / 2

  const sl = bullish ? low : high
  const risk = Math.abs(close - sl)
  const tp = bullish ? close + (risk * 3) : close - (risk * 3)

  const signal = {
    id: Date.now(),
    structure: bullish ? "Bullish" : "Bearish",
    entry: close,
    sl,
    tp,
    rr: "1:3",
    result: "RUNNING"
  }

  db.activeTrade = signal
  writeDB(db)

  return Response.json(signal)
}
