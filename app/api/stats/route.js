import { readDB } from "@/lib/db"

export async function GET() {
  const db = readDB()
  const total = db.stats.win + db.stats.loss
  const winrate = total ? ((db.stats.win / total) * 100).toFixed(2) : 0

  return Response.json({
    win: db.stats.win,
    loss: db.stats.loss,
    total,
    winrate: winrate + "%"
  })
}
