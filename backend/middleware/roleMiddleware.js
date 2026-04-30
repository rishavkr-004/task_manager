const roleMiddleware = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      // 🔴 No user (auth not applied)
      if (!req.user) {
        return res.status(401).json({ msg: "Unauthorized" });
      }

      // 🔴 No role
      if (!req.user.role) {
        return res.status(403).json({ msg: "Role not found" });
      }

      // ❌ Role not allowed
      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({
          msg: `Access denied. Allowed roles: ${allowedRoles.join(", ")}`
        });
      }

      // ✅ Access granted
      next();

    } catch (err) {
      res.status(500).json({ msg: "Role check failed" });
    }
  };
};

module.exports = roleMiddleware;