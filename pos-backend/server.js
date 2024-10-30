const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const db = require("./models"); // Import Sequelize models

dotenv.config(); // Load environment variables from .env file

// Import routes
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const salesRoutes = require("./routes/salesRoutes");
const userRoutes = require("./routes/userRoutes");

// Configure CORS options
const corsOptions = {
  origin: "http://localhost:5173", // Replace with your frontend's address
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Middleware to parse JSON requests
app.use(express.json());
app.use(cookieParser()); // Parse cookies
app.use(cors(corsOptions)); // Enable CORS

const authenticateToken = (req, res, next) => {
  // Skip authentication for these routes
  if (req.path === "/auth/register" || req.path === "/auth/login") {
    return next();
  }

  // Check for token in cookies
  const token = req.cookies.token; // Access the token from cookies

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return res.status(403).json({ message: "Invalid token" });
      req.userId = decoded.userId;
      next();
    });
  } else {
    res.status(401).json({ message: "No token provided" });
  }
};

app.use(authenticateToken); // Use the authentication middleware

// Use routes
app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/sales", salesRoutes);
app.use("/users", userRoutes);

// Default route for unhandled requests
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "An unexpected error occurred" });
});

// Sync Sequelize models with the database
db.sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Database synchronized successfully");
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to synchronize database:", error.message);
  });
