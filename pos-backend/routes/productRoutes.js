const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const checkRole = require("../middlewares/roleMiddleware");

// Product routes
router.get(
  "/",
  checkRole(["Admin", "Manager", "Cashier", "Inventory Clerk"]),
  productController.getAllProducts
);
router.post(
  "/",
  checkRole(["Admin", "Manager"]),
  productController.createProduct
);
router.get(
  "/:id",
  checkRole(["Admin", "Manager", "Cashier", "Inventory Clerk"]),
  productController.getProductById
);
router.put(
  "/:id",
  checkRole(["Admin", "Manager", "Cashier"]),
  productController.updateProduct
);
router.delete(
  "/:id",
  checkRole(["Admin", "Manager"]),
  productController.deleteProduct
);

module.exports = router;
