const mysqlConfig = require("./config.js");
const Sequelize = require("sequelize");
const faker = require("faker");
const format = require("date-fns/format");

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
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
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

// ---------------------------- GENERATE DATA TO SEED ---------------------------- //
const generateName = () =>
  `${faker.commerce.productAdjective()} ${faker.commerce.department()} ${faker.commerce.product()}`;

const generateRestaurantId = () => Math.floor(Math.random() * 100 + 1);

const generateDate = () => format(Date.parse(faker.date.future()), "MMDDYY");

const generateTime = () =>
  Math.floor(Math.random() * (23 - 10) + 10) * 100 +
  Math.floor(Math.random() * 2) * 30;

const generatePartySize = () => Math.floor(Math.random() * 19 + 1);

// ---------------------- SEED DATABASE WITH GENERATED DATA ---------------------- //
for (let i = 0; i < 99; i++) {
  Restaurants.sync().then(() => {
    return Restaurants.create({
      restaurantName: generateName()
    });
  });
}

for (let i = 0; i < 98; i++) {
  Reservations.sync().then(() => {
    return Reservations.create({
      restaurantID: generateRestaurantId(),
      dateToReserve: generateDate(),
      timeToReserve: generateTime(),
      partySize: generatePartySize()
    });
  });
}
