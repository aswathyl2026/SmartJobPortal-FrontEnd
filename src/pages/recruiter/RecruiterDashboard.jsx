import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RecruiterLayout from "./RecruiterLayout";

const stats = [
  { label: "Total Jobs", value: 8, color: "#1D1D1F" },
  { label: "Total Applicants", value: 45, color: "#1D1D1F" },
  { label: "Shortlisted", value: 12, color: "#059669" },
  { label: "Interviews", value: 5, color: "#1D1D1F" },
];

function RecruiterDashboard() {

  const navigate = useNavigate();

  const [hovered, setHovered] = useState(null);

  return (

    <RecruiterLayout>

      {/* TOP ACTION BAR */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "#fff",
          padding: "14px 18px",
          borderRadius: 12,
          border: "1px solid #EAEDF2",
          marginBottom: 20,
          flexWrap: "wrap",
          gap: 10,
        }}
      >

        <div>

          <h3 style={{ margin: 0 }}>
            Dashboard
          </h3>

          <p
            style={{
              margin: 0,
              fontSize: 12,
              color: "#6B7280",
            }}
          >
            Manage jobs and applicants
          </p>

        </div>

        <button
          onClick={() => navigate("/addJob")}
          style={{
            background: "#2563EB",
            color: "#fff",
            padding: "10px 18px",
            borderRadius: 10,
            border: "none",
            cursor: "pointer",
            fontWeight: 600,
            boxShadow: "0 4px 12px rgba(37, 99, 235, 0.25)",
          }}
        >
          + Create Post
        </button>

      </div>

      {/* STATS ROW */}

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 18,
          marginBottom: 30,
        }}
      >

        {stats.map((stat, i) => (

          <div
            key={stat.label}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              flex: "1",
              minWidth: 200,
              background: "#fff",
              padding: 20,
              borderRadius: 14,
              border: "1px solid #EAEDF2",
              transform:
                hovered === i
                  ? "translateY(-3px)"
                  : "translateY(0)",

              boxShadow:
                hovered === i
                  ? "0 8px 20px rgba(0,0,0,0.08)"
                  : "0 2px 8px rgba(0,0,0,0.04)",

              transition: "0.2s",
            }}
          >

            <p
              style={{
                fontSize: 12,
                color: "#6B7280",
              }}
            >
              {stat.label}
            </p>

            <h2
              style={{
                fontSize: 28,
                color: stat.color,
              }}
            >
              {stat.value}
            </h2>

          </div>

        ))}

      </div>

      {/* CONTENT BOX */}

    

    </RecruiterLayout>

  );
}

export default RecruiterDashboard;