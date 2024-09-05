const db = require("../models");

// Get all sales
exports.getAllSales = async (req, res) => {
  try {
    const sales = await db.Sale.findAll({ include: [db.User, db.SaleItem] });
    res.json(sales);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new sale
exports.createSale = async (req, res) => {
  const { user_id, total_amount, payment_method, items } = req.body;
  try {
    const newSale = await db.Sale.create({
      user_id,
      total_amount,
      payment_method,
    });
    for (const item of items) {
      await db.SaleItem.create({
        sale_id: newSale.id,
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.price,
      });
    }
    res.status(201).json(newSale);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a sale by ID
exports.getSaleById = async (req, res) => {
  try {
    const sale = await db.Sale.findByPk(req.params.id, {
      include: [db.User, db.SaleItem],
    });
    if (!sale) return res.status(404).json({ message: "Sale not found" });
    res.json(sale);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a sale
exports.updateSale = async (req, res) => {
  try {
    const sale = await db.Sale.findByPk(req.params.id);
    if (!sale) return res.status(404).json({ message: "Sale not found" });
    await sale.update(req.body);
    res.json(sale);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a sale
exports.deleteSale = async (req, res) => {
  try {
    const sale = await db.Sale.findByPk(req.params.id);
    if (!sale) return res.status(404).json({ message: "Sale not found" });
    await sale.destroy();
    res.json({ message: "Sale deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
