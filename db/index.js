const Sequelize = require('sequelize');
const mysqlConfig = require('./config.js');

// 'mysql://{user}:{password}@{IP}/{databaseName}'
const sequelize = new Sequelize(mysqlConfig);

sequelize
  .authenticate()
  .then(() => {
    console.log('Successfully connected to database.');
  })
  .catch((err) => {
    throw err;
  });

const Restaurants = sequelize.define(
  'restaurants',
  {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    restaurantName: Sequelize.STRING,
  },
  {
    timestamps: false,
  });

const Reservations = sequelize.define(
  'reservations',
  {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    restaurantID: {
      type: Sequelize.STRING,
      references: {
        model: Restaurants,
        key: 'id',
      },
    },
    dateToReserve: Sequelize.STRING,
    timeToReserve: Sequelize.STRING,
    partySize: Sequelize.STRING,
  },
  {
    timestamps: false,
  });

const addRestaurant = (restaurantName) => {
  Restaurants.sync()
    .then(() => Restaurants.create({ restaurantName }));
};

const addReservation = (restaurantID, dateToReserve, timeToReserve, partySize, callback) => {
  return Reservations.sync()
    .then(() => Reservations.create({
      restaurantID,
      dateToReserve,
      timeToReserve,
      partySize,
    }))
    .then(() => {
      callback();
    })
    .catch((err) => { throw err; });
};

const getReservations = (restaurantID, dateToReserve, callback) => {
  Reservations.sync()
    .then(() => {
      return Reservations.findAll({
        where: {
          restaurantID,
          dateToReserve,
        },
      });
    })
    .then(results => callback(JSON.stringify(results)))
    .catch((err) => { throw err; });
};

module.exports = {
  addRestaurant,
  addReservation,
  getReservations,
};
