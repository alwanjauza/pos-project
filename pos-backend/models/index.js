const Sequelize = require("sequelize");
const config =
  require("../config/config")[process.env.NODE_ENV || "development"];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Load models
db.User = require("./user")(sequelize, Sequelize);
db.Role = require("./role")(sequelize, Sequelize);
db.Product = require("./product")(sequelize, Sequelize);
db.Sale = require("./sale")(sequelize, Sequelize);
db.SaleItem = require("./saleItem")(sequelize, Sequelize);

// Define associations
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
