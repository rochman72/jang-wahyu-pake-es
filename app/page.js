"use client"

import { useState } from "react"

export default function Home() {
  const [signal, setSignal] = useState(null)
  const [chartOpen, setChartOpen] = useState(true)

  async function generateAuto() {
    const res = await fetch("/api/ict")
    const data = await res.json()
    setSignal(data)
  }

  async function generateSemi() {
    const res = await fetch("/api/ict")
    const data = await res.json()
    setSignal(data)
  }

  return (
    <main style={{
      background:"#000",
      minHeight:"100vh",
      padding:"20px",
      fontFamily:"Arial",
      color:"white"
    }}>

      <h1 style={{
        textAlign:"center",
        color:"red",
        marginBottom:"20px",
        fontSize:"22px"
      }}>
        XAU/USD INSTITUTIONAL ICT ENGINE
      </h1>

      <div style={{textAlign:"center", marginBottom:"15px"}}>
        <button
          onClick={()=>setChartOpen(!chartOpen)}
          style={{
            padding:"8px 16px",
            background:"#00ffff",
            border:"none",
            cursor:"pointer",
            fontWeight:"bold"
          }}
        >
          {chartOpen ? "MINIMIZE CHART" : "MAXIMIZE CHART"}
        </button>
      </div>

      {chartOpen && (
        <div style={{
          width:"100%",
          height:"400px",
          marginBottom:"20px"
        }}>
          <iframe
            src="https://www.tradingview.com/widgetembed/?symbol=OANDA:XAUUSD&interval=15"
            style={{width:"100%", height:"100%"}}
          />
        </div>
      )}

      <h2 style={{
        textAlign:"center",
        color:"red",
        marginBottom:"15px"
      }}>
        AI ANALYSIS
      </h2>

      <div style={{
        display:"flex",
        justifyContent:"center",
        gap:"15px",
        flexWrap:"wrap",
        marginBottom:"20px"
      }}>
        <button
          onClick={generateAuto}
          style={{
            padding:"10px 20px",
            background:"red",
            border:"none",
            color:"white",
            cursor:"pointer"
          }}
        >
          GENERATE SIGNAL OTOMATIS
        </button>

        <button
          onClick={generateSemi}
          style={{
            padding:"10px 20px",
            background:"#00ffff",
            border:"none",
            color:"black",
            cursor:"pointer"
          }}
        >
          GENERATE SIGNAL SEMI
        </button>
      </div>

      {signal && (
        <div style={{
          background:"#111",
          padding:"15px",
          border:"1px solid red",
          maxWidth:"500px",
          margin:"auto",
          borderRadius:"8px"
        }}>
          <p>Structure: {signal.structure}</p>
          <p>Entry: {signal.entry}</p>
          <p>SL: {signal.sl}</p>
          <p>TP: {signal.tp}</p>
          <p>RR: {signal.rr}</p>
        </div>
      )}

    </main>
  )
}
