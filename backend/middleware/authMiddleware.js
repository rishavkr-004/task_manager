const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    let token = req.header("Authorization");

    // 🔴 No token
    if (!token) {
      return res.status(401).json({ msg: "No token, access denied" });
    }

    // ✅ Handle "Bearer TOKEN"
    if (token.startsWith("Bearer ")) {
      token = token.split(" ")[1];
    }

    // 🔴 Invalid format
    if (!token) {
      return res.status(401).json({ msg: "Token format invalid" });
    }

    // ✅ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Attach user data
    req.user = {
      id: decoded.id,
      role: decoded.role
    };

    next();
  } catch (err) {
    res.status(401).json({ msg: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;