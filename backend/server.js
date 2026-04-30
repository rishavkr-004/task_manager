const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

console.log("🚀 Starting server...");

// ✅ CORS (allow frontend later)
app.use(cors({
  origin: "*", // change to frontend URL later
}));

app.use(express.json());

/* =========================
   ✅ HEALTH + TEST ROUTES
========================= */

// Root test (Railway checks this)
app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

// Health check (important for Railway)
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

/* =========================
   ✅ ROUTES
========================= */

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));
app.use("/api/projects", require("./routes/projectRoutes"));

/* =========================
   ✅ DATABASE + SERVER START
   (IMPORTANT FIX)
========================= */

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🔥 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("❌ DB ERROR:", err);
  });