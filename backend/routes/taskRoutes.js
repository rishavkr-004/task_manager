const router = require("express").Router();

const {
  createTask,
  getTasks,
  updateTaskStatus,
  getDashboard,
  updateTask,
  deleteTask
} = require("../controllers/taskController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");


// 🔐 Admin → Create Task
router.post("/", authMiddleware, roleMiddleware("admin"), createTask);

// 📋 All users → Get Tasks (role filtered inside controller)
router.get("/", authMiddleware, getTasks);

// 📊 Dashboard
router.get("/dashboard", authMiddleware, getDashboard);

// 🔄 Update Status (admin + assigned member)
router.put("/:id/status", authMiddleware, updateTaskStatus);

// ✏️ Edit Task (Admin only)
router.put("/:id", authMiddleware, roleMiddleware("admin"), updateTask);

// 🗑️ Delete Task (Admin only)
router.delete("/:id", authMiddleware, roleMiddleware("admin"), deleteTask);

module.exports = router;