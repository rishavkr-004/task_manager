import { useEffect, useState } from "react";
import API from "../services/api";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const [editingProject, setEditingProject] = useState(null);
  const [editName, setEditName] = useState("");

  const fetchProjects = async () => {
    const res = await API.get("/projects");
    setProjects(res.data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // ➕ Create
  const createProject = async (e) => {
    e.preventDefault();
    if (!name) return;

    await API.post("/projects", { name });
    setName("");
    fetchProjects();
  };

  // ✏️ Update
  const updateProject = async (e) => {
    e.preventDefault();
    await API.put(`/projects/${editingProject._id}`, { name: editName });
    setEditingProject(null);
    fetchProjects();
  };

  // 🗑️ Delete
  const deleteProject = async (id) => {
    if (!window.confirm("Delete this project?")) return;
    await API.delete(`/projects/${id}`);
    fetchProjects();
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.heading}>Projects</h2>

        {/* ➕ CREATE (ADMIN ONLY) */}
        {user?.role === "admin" && (
          <form onSubmit={createProject} style={styles.form}>
            <input
              placeholder="Enter project name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={styles.input}
            />
            <button style={styles.button}>Add</button>
          </form>
        )}

        {/* 📦 PROJECT GRID */}
        {projects.length === 0 ? (
          <p style={styles.empty}>No projects yet</p>
        ) : (
          <div style={styles.grid}>
            {projects.map((p) => (
              <div key={p._id} style={styles.card}>
                <h3>{p.name}</h3>

                <p style={styles.meta}>
                  👤 {p.createdBy?.name || "Admin"}
                </p>

                {/* 🔐 ADMIN ACTIONS */}
                {user?.role === "admin" && (
                  <div style={styles.actions}>
                    <button
                      style={styles.editBtn}
                      onClick={() => {
                        setEditingProject(p);
                        setEditName(p.name);
                      }}
                    >
                      ✏️ Edit
                    </button>

                    <button
                      style={styles.deleteBtn}
                      onClick={() => deleteProject(p._id)}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ✏️ EDIT MODAL */}
        {editingProject && (
          <div style={styles.modalOverlay}>
            <form onSubmit={updateProject} style={styles.modal}>
              <h3>Edit Project</h3>

              <input
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                style={styles.input}
              />

              <div style={styles.modalActions}>
                <button style={styles.button}>Save</button>
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  style={styles.cancelBtn}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    background: "#f1f5f9",
    minHeight: "100vh",
    padding: "30px"
  },

  container: {
    maxWidth: "1000px",
    margin: "auto"
  },

  heading: {
    marginBottom: "20px"
  },

  form: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px"
  },

  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc"
  },

  button: {
    padding: "10px 16px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
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
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
  },

  meta: {
    color: "#64748b",
    fontSize: "14px",
    marginTop: "5px"
  },

  actions: {
    marginTop: "10px",
    display: "flex",
    gap: "10px"
  },

  editBtn: {
    background: "#facc15",
    border: "none",
    padding: "6px 10px",
    borderRadius: "6px",
    cursor: "pointer"
  },

  deleteBtn: {
    background: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "6px 10px",
    borderRadius: "6px",
    cursor: "pointer"
  },

  empty: {
    textAlign: "center",
    marginTop: "40px",
    color: "#64748b"
  },

  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },

  modal: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    width: "300px"
  },

  modalActions: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px"
  },

  cancelBtn: {
    background: "#e5e7eb",
    border: "none",
    padding: "8px",
    borderRadius: "6px",
    cursor: "pointer"
  }
};