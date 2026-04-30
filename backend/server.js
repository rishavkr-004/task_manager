const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

console.log("🚀 Starting server...");

// ✅ CORS (allow all for now, can restrict later)
app.use(cors({
  origin: "*",
}));

app.use(express.json());

// ✅ Root test route (VERY IMPORTANT for Railway)
app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

// ✅ Health check (Railway uses this sometimes)
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

// ✅ Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));
app.use("/api/projects", require("./routes/projectRoutes"));

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ DB ERROR:", err));

// ✅ IMPORTANT: Railway Port Fix
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🔥 Server running on port ${PORT}`);
});