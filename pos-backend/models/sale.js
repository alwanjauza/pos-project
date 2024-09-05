module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define("Sale", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "id",
      },
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

  Sale.associate = (models) => {
    Sale.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
    });
    Sale.hasMany(models.SaleItem, {
      foreignKey: "sale_id",
      as: "saleItems",
    });
  };

  return Sale;
};
