import { useNavigate } from "react-router-dom";

export default function Layout({ children }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={styles.wrapper}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h2 style={{ marginBottom: "20px" }}>TaskManager</h2>

        <button onClick={() => navigate("/")} style={styles.link}>
          Dashboard
        </button>

        <button onClick={() => navigate("/tasks")} style={styles.link}>
          Tasks
        </button>

        <button onClick={() => navigate("/projects")} style={styles.link}>
          Projects
        </button>

        <button onClick={logout} style={styles.logout}>
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div style={styles.content}>{children}</div>
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    minHeight: "100vh",
    background: "#f1f5f9"
  },
  sidebar: {
    width: "220px",
    background: "#1e293b",
    color: "#fff",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },
  link: {
    background: "transparent",
    color: "#fff",
    border: "none",
    padding: "10px",
    textAlign: "left",
    cursor: "pointer"
  },
  logout: {
    marginTop: "auto",
    background: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "10px",
    borderRadius: "6px",
    cursor: "pointer"
  },
  content: {
    flex: 1,
    padding: "30px"
  }
};