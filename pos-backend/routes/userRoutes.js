const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const checkRole = require("../middlewares/roleMiddleware");

// User routes
router.get("/", checkRole(["Admin"]), userController.getAllUsers);
router.get("/:id", checkRole(["Admin", "Manager"]), userController.getUserById);
router.put("/:id", checkRole(["Admin"]), userController.updateUser);
router.delete("/:id", checkRole(["Admin"]), userController.deleteUser);

module.exports = router;
