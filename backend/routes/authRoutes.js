const router = require("express").Router();

// ✅ Import ALL controllers (including getUsers)
const { register, login, getUsers } = require("../controllers/authController");

// ✅ Import middleware
const authMiddleware = require("../middleware/authMiddleware");

// 🔓 Public routes
router.post("/register", register);
router.post("/login", login);

// 👥 Get all users (for task assignment)
router.get("/users", authMiddleware, getUsers);

// 🔐 Protected test route
router.get("/protected", authMiddleware, (req, res) => {
  res.json({
    message: "Access granted ✅",
    user: req.user
  });
});

module.exports = router;