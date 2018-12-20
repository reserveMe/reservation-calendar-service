const mysqlConfig = require("./config.js");
const Sequelize = require("sequelize");
const faker = require("faker");

// 'mysql://{user}:{password}@{IP}/{databaseName}'
const sequelize = new Sequelize(mysqlConfig);

sequelize
  .authenticate()
  .then(() => {
    console.log("Successfully connected to database.");
  })
  .catch(err => {
    throw err;
  });

const Restaurant = sequelize.define("restaurant", {
  restaurantName: Sequelize.STRING
});
