const mysqlConfig = require("./config.js");
const Sequelize = require("sequelize");
const faker = require("faker");

console.log(mysqlConfig);
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

const Restaurants = sequelize.define(
  "restaurants",
  {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    restaurantName: Sequelize.STRING
  },
  {
    timestamps: false
  }
);

const Reservations = sequelize.define(
  "reservations",
  {
    restaurantID: {
      type: Sequelize.INTEGER,
      references: {
        model: Restaurants,
        key: "id"
      }
    },
    dateToReserve: Sequelize.INTEGER,
    timeToReserve: Sequelize.INTEGER,
    partySize: Sequelize.INTEGER
  },
  {
    timestamps: false
  }
);

Restaurants.sync().then(() => {
  return Restaurants.create({
    restaurantName: "LihoLiho Yacht Club"
  });
});
