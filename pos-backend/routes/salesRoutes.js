const express = require("express");
const router = express.Router();
const salesController = require("../controllers/salesController");
const checkRole = require("../middlewares/roleMiddleware");

// Sales routes
router.get("/", checkRole(["Admin", "Manager"]), salesController.getAllSales);
router.post("/", checkRole(["Admin", "Cashier"]), salesController.createSale);
router.get(
  "/:id",
  checkRole(["Admin", "Manager", "Cashier"]),
  salesController.getSaleById
);
router.put("/:id", checkRole(["Admin", "Manager"]), salesController.updateSale);
router.delete("/:id", checkRole(["Admin"]), salesController.deleteSale);

module.exports = router;
