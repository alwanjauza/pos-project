const db = require("../models");
const bcrypt = require("bcrypt");

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await db.User.findAll({
      attributes: ["id", "name", "email", "role_id"],
      include: [{ model: db.Role, attributes: ["role_name"], as: "role" }], // Use the alias 'role'
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await db.User.findByPk(req.params.id, {
      attributes: ["id", "name", "email", "role_id"],
      include: [{ model: db.Role, attributes: ["role_name"], as: "role" }], // Use the alias 'role'
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/// Update a user
exports.updateUser = async (req, res) => {
  const { name, email, password, role_id } = req.body; // Include all potential fields to update
  try {
    const user = await db.User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Prepare the update object
    const updateData = {};

    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (password) {
      // Hash the new password
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }
    if (role_id) updateData.role_id = role_id;

    // Update user details
    await user.update(updateData);
    res.json({ message: "User updated successfully", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    const user = await db.User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.destroy();
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
