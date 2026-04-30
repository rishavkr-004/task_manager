import { useEffect, useState } from "react";
import API from "../services/api";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const [form, setForm] = useState({
    title: "",
    description: "",
    projectId: "",
    assignedTo: "",
    dueDate: ""
  });

  const [editingTask, setEditingTask] = useState(null);

  const fetchData = async () => {
    const [t, p, u] = await Promise.all([
      API.get("/tasks"),
      API.get("/projects"),
      API.get("/auth/users")
    ]);

    setTasks(t.data);
    setProjects(p.data);
    setUsers(u.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ➕ Create
  const createTask = async (e) => {
    e.preventDefault();
    await API.post("/tasks", form);
    setForm({
      title: "",
      description: "",
      projectId: "",
      assignedTo: "",
      dueDate: ""
    });
    fetchData();
  };

  // 🔄 Update status
  const updateStatus = async (id, status) => {
    await API.put(`/tasks/${id}/status`, { status });
    fetchData();
  };

  // ✏️ Update
  const updateTask = async (e) => {
    e.preventDefault();
    await API.put(`/tasks/${editingTask._id}`, editingTask);
    setEditingTask(null);
    fetchData();
  };

  // 🗑️ Delete
  const deleteTask = async (id) => {
    if (!window.confirm("Delete task?")) return;
    await API.delete(`/tasks/${id}`);
    fetchData();
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.heading}>Task Management</h2>

        {/* CREATE */}
        {user?.role === "admin" && (
          <form onSubmit={createTask} style={styles.formCard}>
            <h3>Create Task</h3>

            <input
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              style={styles.input}
            />

            <input
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              style={styles.input}
            />

            <select
              value={form.projectId}
              onChange={(e) =>
                setForm({ ...form, projectId: e.target.value })
              }
              style={styles.input}
            >
              <option value="">Project</option>
              {projects.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.name}
                </option>
              ))}
            </select>

            <select
              value={form.assignedTo}
              onChange={(e) =>
                setForm({ ...form, assignedTo: e.target.value })
              }
              style={styles.input}
            >
              <option value="">Assign User</option>
              {users.map((u) => (
                <option key={u._id} value={u._id}>
                  {u.name}
                </option>
              ))}
            </select>

            <input
              type="date"
              value={form.dueDate}
              onChange={(e) =>
                setForm({ ...form, dueDate: e.target.value })
              }
              style={styles.input}
            />

            <button style={styles.primaryBtn}>Create</button>
          </form>
        )}

        {/* TASK LIST */}
        <div style={styles.grid}>
          {tasks.map((t) => (
            <div key={t._id} style={styles.card}>
              <div style={styles.cardHeader}>
                <h3>{t.title}</h3>
                <span style={statusStyle(t.status)}>{t.status}</span>
              </div>

              <p style={styles.desc}>{t.description}</p>

              <div style={styles.meta}>
                <span>📁 {t.projectId?.name}</span>
                <span>👤 {t.assignedTo?.name}</span>
              </div>

              <div style={styles.actions}>
                <button onClick={() => updateStatus(t._id, "todo")}>Todo</button>
                <button onClick={() => updateStatus(t._id, "in-progress")}>Progress</button>
                <button onClick={() => updateStatus(t._id, "done")}>Done</button>
              </div>

              {user?.role === "admin" && (
                <div style={styles.actions}>
                  <button onClick={() => setEditingTask(t)}>✏️ Edit</button>
                  <button onClick={() => deleteTask(t._id)}>🗑️ Delete</button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* EDIT MODAL */}
        {editingTask && (
          <div style={styles.modalOverlay}>
            <form onSubmit={updateTask} style={styles.modal}>
              <h3>Edit Task</h3>

              <input
                value={editingTask.title}
                onChange={(e) =>
                  setEditingTask({ ...editingTask, title: e.target.value })
                }
              />

              <input
                value={editingTask.description}
                onChange={(e) =>
                  setEditingTask({ ...editingTask, description: e.target.value })
                }
              />

              <button type="submit">Save</button>
              <button type="button" onClick={() => setEditingTask(null)}>
                Cancel
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}


// 🎨 STYLES
const styles = {
  page: { background: "#f1f5f9", minHeight: "100vh", padding: "30px" },
  container: { maxWidth: "1100px", margin: "auto" },
  heading: { marginBottom: "20px" },

  formCard: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    marginBottom: "30px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
  },

  input: {
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    width: "100%"
  },

  primaryBtn: {
    background: "#2563eb",
    color: "#fff",
    padding: "10px",
    border: "none",
    borderRadius: "6px"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "20px"
  },

  card: {
    background: "#fff",
    padding: "15px",
    borderRadius: "12px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.05)"
  },

  cardHeader: {
    display: "flex",
    justifyContent: "space-between"
  },

  desc: { margin: "10px 0", color: "#555" },

  meta: {
    fontSize: "14px",
    display: "flex",
    justifyContent: "space-between",
    color: "#777"
  },

  actions: { marginTop: "10px", display: "flex", gap: "5px" },

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
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  }
};


// 🎨 STATUS STYLE
const statusStyle = (status) => {
  const base = {
    padding: "4px 10px",
    borderRadius: "6px",
    fontSize: "12px"
  };

  if (status === "todo") return { ...base, background: "#e5e7eb" };
  if (status === "in-progress") return { ...base, background: "#fde68a" };
  if (status === "done") return { ...base, background: "#86efac" };

  return base;
};