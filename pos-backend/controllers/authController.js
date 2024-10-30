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
// User login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await db.User.findOne({ where: { email } });

    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // Fetch role name from the Role table based on user's role_id
    const role = await db.Role.findOne({ where: { id: user.role_id } });

    if (!role) return res.status(404).json({ message: "Role not found" });

    const token = jwt.sign(
      { userId: user.id, roleId: user.role_id, roleName: role.role_name }, // Include roleName in the payload
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Set cookies for token, userId, roleId, and roleName
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600000, // 1 hour
    });

    res.cookie("userId", user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600000, // 1 hour
    });

    res.cookie("roleId", user.role_id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600000, // 1 hour
    });

    res.cookie("roleName", role.role_name, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600000, // 1 hour
    });

    res.json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.verifyToken = (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    res.json({ message: "Token is valid", userId: decoded.userId });
  });
};
