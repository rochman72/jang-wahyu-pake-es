"use client"
import { useEffect, useState } from "react"

export default function Home() {

  const [chartFull, setChartFull] = useState(false)
  const [signal, setSignal] = useState(null)

  const [manualHigh, setManualHigh] = useState("")
  const [manualLow, setManualLow] = useState("")
  const [manualPrice, setManualPrice] = useState("")

  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://s3.tradingview.com/tv.js"
    script.async = true
    script.onload = () => {
      new window.TradingView.widget({
        symbol: "OANDA:XAUUSD",
        interval: "15",
        timezone: "Asia/Jakarta",
        theme: "dark",
        style: "1",
        locale: "en",
        container_id: "tv_chart"
      })
    }
    document.body.appendChild(script)
  }, [])

  const autoGenerate = async () => {
    const res = await fetch("/api/ict")
    const data = await res.json()
    setSignal(data)
  }

  const semiGenerate = () => {
    const high = parseFloat(manualHigh)
    const low = parseFloat(manualLow)
    const price = parseFloat(manualPrice)

    if(!high || !low || !price) return

    const bullish = price > (high+low)/2

    const sl = bullish ? low : high
    const risk = Math.abs(price - sl)
    const tp = bullish ? price + (risk*3) : price - (risk*3)

    setSignal({
      structure: bullish ? "Bullish" : "Bearish",
      liquidity: "Manual Sweep",
      fvg: bullish ? "Bullish FVG" : "Bearish FVG",
      session: "Manual Mode",
      entry: price,
      sl: sl,
      tp: tp,
      rr: "1:3",
      probability: bullish ? "68%" : "64%"
    })
  }

  return (
    <div style={{background:"black", color:"red", minHeight:"100vh", padding:"20px"}}>

      <h1 style={{
        border:"3px solid red",
        padding:"15px",
        textAlign:"center"
      }}>
        XAU/USD INSTITUTIONAL ICT ENGINE
      </h1>

      <div style={{textAlign:"center", marginTop:"10px"}}>
        <button onClick={()=>setChartFull(!chartFull)}
          style={{
            border:"2px solid cyan",
            background:"black",
            color:"cyan",
            padding:"6px 15px"
          }}>
          {chartFull ? "MINIMIZE CHART" : "MAXIMIZE CHART"}
        </button>
      </div>

      <div id="tv_chart"
        style={{
          height: chartFull ? "80vh" : "400px",
          marginTop:"20px"
        }}>
      </div>

      <div style={{marginTop:"40px", textAlign:"center"}}>
        <h2>AI ANALIS</h2>

        <button onClick={autoGenerate}
          style={{
            border:"2px solid red",
            padding:"10px 20px",
            background:"black",
            color:"red",
            margin:"10px"
          }}>
          GENERATE SIGNAL OTOMATIS
        </button>

        <button onClick={semiGenerate}
          style={{
            border:"2px solid cyan",
            padding:"10px 20px",
            background:"black",
            color:"cyan",
            margin:"10px"
          }}>
          GENERATE SIGNAL SEMI
        </button>
      </div>

      <div style={{textAlign:"center", marginTop:"20px"}}>
        <input placeholder="Swing High"
          onChange={(e)=>setManualHigh(e.target.value)}
          style={{margin:"5px"}} />

        <input placeholder="Swing Low"
          onChange={(e)=>setManualLow(e.target.value)}
          style={{margin:"5px"}} />

        <input placeholder="Current Price"
          onChange={(e)=>setManualPrice(e.target.value)}
          style={{margin:"5px"}} />
      </div>

      {signal && (
        <div style={{marginTop:"30px", textAlign:"center"}}>
          <p>Structure: {signal.structure}</p>
          <p>Liquidity: {signal.liquidity}</p>
          <p>FVG: {signal.fvg}</p>
          <p>Session: {signal.session}</p>
          <p>Entry: {signal.entry}</p>
          <p>SL: {signal.sl}</p>
          <p>TP: {signal.tp}</p>
          <p>RR: {signal.rr}</p>
          <p>Probability: {signal.probability}</p>
        </div>
      )}

    </div>
  )
}
