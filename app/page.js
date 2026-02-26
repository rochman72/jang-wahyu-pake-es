"use client"
import { useState } from "react"

export default function Home() {
  const [data, setData] = useState(null)

  async function load() {
    const res = await fetch("/api/ict")
    const json = await res.json()
    setData(json)
  }

  return (
    <div style={{
      background:"#000",
      color:"#ff1a1a",
      minHeight:"100vh",
      padding:"40px",
      textAlign:"center"
    }}>
      <h1 style={{border:"3px solid red", padding:"20px"}}>
        XAU/USD INSTITUTIONAL ICT ENGINE
      </h1>

      <button onClick={load}
        style={{
          padding:"15px",
          marginTop:"20px",
          border:"2px solid red",
          background:"#111",
          color:"red"
        }}>
        RUN AI
      </button>

      {data && (
        <div style={{marginTop:"30px"}}>
          <p>Structure: {data.structure}</p>
          <p>Liquidity: {data.liquidity ? "Taken" : "Not Taken"}</p>
          <p>FVG: {data.fvg}</p>
          <p>Session: {data.session}</p>
          <p>Entry: {data.entry}</p>
          <p>SL: {data.sl}</p>
          <p>TP: {data.tp}</p>
          <p>RR: {data.rr}</p>
          <p>Probability: {data.probability}</p>
        </div>
      )}
    </div>
  )
}
