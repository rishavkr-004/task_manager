const router = require("express").Router();

const {
  createProject,
  getProjects,
  updateProject,
  deleteProject
} = require("../controllers/projectController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");


// 🔐 Admin only → Create Project
router.post("/", authMiddleware, roleMiddleware("admin"), createProject);

// 📋 All logged-in users → Get Projects (filtered in controller)
router.get("/", authMiddleware, getProjects);

// ✏️ Admin only → Update Project
router.put("/:id", authMiddleware, roleMiddleware("admin"), updateProject);

// 🗑️ Admin only → Delete Project
router.delete("/:id", authMiddleware, roleMiddleware("admin"), deleteProject);

module.exports = router;