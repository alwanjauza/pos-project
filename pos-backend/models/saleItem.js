module.exports = (sequelize, DataTypes) => {
  const SaleItem = sequelize.define("SaleItem", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    sale_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Sales",
        key: "id",
      },
    },
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Products",
        key: "id",
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });

  SaleItem.associate = (models) => {
    SaleItem.belongsTo(models.Sale, {
      foreignKey: "sale_id",
      as: "sale",
    });
    SaleItem.belongsTo(models.Product, {
      foreignKey: "product_id",
      as: "product",
    });
  };

  return SaleItem;
};
