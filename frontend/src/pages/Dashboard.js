import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  // ✅ Safe parse (avoid crash if null)
  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    API.get("/tasks/dashboard")
      .then((res) => setData(res.data))
      .catch(() => {
        localStorage.clear();
        navigate("/login");
      });
  }, [navigate]);

  if (!data) return <p style={styles.loading}>Loading dashboard...</p>;

  return (
    <div style={styles.container}>
      
      {/* 🔝 Topbar */}
      <div style={styles.topbar}>
        <h2 style={styles.heading}>Dashboard Overview</h2>

        <div style={styles.userBox}>
          <span>👤 {user?.name || "User"}</span>
          <span style={styles.role}>{user?.role || "member"}</span>
        </div>
      </div>

      {/* 📊 Cards */}
      <div style={styles.grid}>
        <Card title="Total Tasks" value={data.total} color="#3b82f6" />
        <Card title="Completed" value={data.completed} color="#22c55e" />
        <Card title="Pending" value={data.pending} color="#f59e0b" />
        <Card title="Overdue" value={data.overdue} color="#ef4444" />
      </div>
    </div>
  );
}


// 📦 Card Component
const Card = ({ title, value, color }) => (
  <div style={{ ...styles.card, borderLeft: `6px solid ${color}` }}>
    <h4 style={styles.cardTitle}>{title}</h4>
    <h2 style={{ ...styles.value, color }}>{value}</h2>
  </div>
);


// 🎨 STYLES
const styles = {
  container: {
    padding: "20px",
    background: "#f1f5f9",
    minHeight: "100vh"
  },

  topbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px"
  },

  heading: {
    margin: 0
  },

  userBox: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    background: "#fff",
    padding: "8px 12px",
    borderRadius: "8px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
  },

  role: {
    fontSize: "12px",
    background: "#2563eb",
    color: "#fff",
    padding: "2px 6px",
    borderRadius: "4px"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px"
  },

  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
    transition: "0.2s"
  },

  cardTitle: {
    color: "#64748b"
  },

  value: {
    marginTop: "10px",
    fontSize: "28px",
    fontWeight: "bold"
  },

  loading: {
    textAlign: "center",
    marginTop: "100px",
    fontSize: "18px"
  }
};