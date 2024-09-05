const db = require("../models");

// Middleware to check user's role
const checkRole = (allowedRoles) => {
  return async (req, res, next) => {
    try {
      // Check if userId is set
      if (!req.userId)
        return res.status(401).json({ message: "Unauthorized: No user ID" });

      const user = await db.User.findByPk(req.userId);
      if (!user) return res.status(404).json({ message: "User not found" });

      const userRole = await db.Role.findByPk(user.role_id);
      if (!userRole) return res.status(404).json({ message: "Role not found" });

      // Check if the user's role is included in the allowedRoles array
      if (!allowedRoles.includes(userRole.role_name)) {
        return res
          .status(403)
          .json({ message: "Access forbidden: Insufficient permissions" });
      }

      next();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
};

module.exports = checkRole;
