const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models");

// User registration
exports.register = async (req, res) => {
  const { name, email, password, role_id } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await db.User.create({
      name,
      email,
      password: hashedPassword,
      role_id,
    });
    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// User login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await db.User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { userId: user.id, roleId: user.role_id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ token, userId: user.id, name: user.name, roleId: user.role_id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
