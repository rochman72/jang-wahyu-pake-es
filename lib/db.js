import fs from "fs"
import path from "path"

const filePath = path.join(process.cwd(), "data.json")

export function readDB() {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify({
      activeTrade: null,
      history: [],
      stats: { win: 0, loss: 0 }
    }))
  }

  return JSON.parse(fs.readFileSync(filePath))
}

export function writeDB(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
}
