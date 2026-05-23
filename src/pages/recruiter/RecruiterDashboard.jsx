import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "./Navbar"

const stats = [
  { label: "Total Jobs", value: 8, color: "#1D1D1F" },
  { label: "Total Applicants", value: 45, color: "#1D1D1F" },
  { label: "Shortlisted", value: 12, color: "#059669" },
  { label: "Interviews", value: 5, color: "#1D1D1F" },
]

function RecruiterDashboard() {

  const navigate = useNavigate()
  const [hovered, setHovered] = useState(null)

  return (
    <div className='flex flex-col'  style={{ display: "flex", minHeight: "100vh", background: "#F5F6FA" }}>

      {/* SIDEBAR + TOPBAR */}
      <Navbar />

      {/* MAIN CONTENT */}
      <div style={{ flex: 1, overflowY: "auto", padding: 20 }}>

        {/* TITLE */}
        <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 20 }}>
          📊 Recruiter Dashboard
        </h1>

        {/* STATS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: window.innerWidth < 768 ? "1fr" : "repeat(4,1fr)",
            gap: 18,
            marginBottom: 32,
          }}
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: "#fff",
                padding: 20,
                borderRadius: 14,
                border: "1px solid #EAEDF2",
                transform: hovered === i ? "translateY(-3px)" : "none",
                boxShadow: hovered === i
                  ? "0 8px 24px rgba(0,0,0,0.1)"
                  : "0 2px 8px rgba(0,0,0,0.04)",
                transition: "0.2s",
              }}
            >
              <p style={{ fontSize: 12, color: "#6B7280" }}>
                {stat.label}
              </p>

              <h2 style={{ fontSize: 28, color: stat.color }}>
                {stat.value}
              </h2>
            </div>
          ))}
        </div>

        {/* ACTION */}
        <div
          style={{
            background: "#fff",
            padding: 20,
            borderRadius: 16,
            border: "1px solid #EAEDF2",
          }}
        >

          <h2 style={{ marginBottom: 10 }}>Recent Applicants</h2>

          <button
            onClick={() => navigate("/addJob")}
            style={{
              background: "#2563EB",
              color: "#fff",
              padding: "10px 16px",
              borderRadius: 8,
              border: "none",
              cursor: "pointer",
            }}
          >
            + Post New Job
          </button>

        </div>

      </div>

    </div>
  )
}

export default RecruiterDashboard