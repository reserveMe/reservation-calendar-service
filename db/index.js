const { Pool } = require('pg');
const config = require('./config.js');

// 'mysql://{user}:{password}@{IP}/{databaseName}'
// const sequelize = new Sequelize(mysqlConfig);
// const sequelize = new Sequelize(`mysql://root:mysql1passres@172.17.0.2/openTableReservations`)

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Successfully connected to database.');
//   })
//   .catch((err) => {
//     throw err;
//   });

const pool = new Pool(config);

// const Restaurants = sequelize.define(
//   'restaurants',
//   {
//     id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
//     restaurantName: Sequelize.STRING,
//   },
//   {
//     timestamps: false,
//   });

// const Reservations = sequelize.define(
//   'reservations',
//   {
//     id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
//     restaurantID: {
//       type: Sequelize.STRING,
//       references: {
//         model: Restaurants,
//         key: 'id',
//       },
//     },
//     dateToReserve: Sequelize.STRING,
//     timeToReserve: Sequelize.STRING,
//     partySize: Sequelize.STRING,
//   },
//   {
//     timestamps: false,
//   });

const addRestaurant = (restaurantName) => {
  // Restaurants.sync()
  //   .then(() => Restaurants.create({ restaurantName }));
  return pool.query(`INSERT INTO restaurants (name) VALUES (${restaurantName})`);
};

const addReservation = (restaurantID, dateToReserve, timeToReserve, partySize, callback) => {
  // return Reservations.sync()
  //   .then(() => Reservations.create({
  //     restaurantID,
  //     dateToReserve,
  //     timeToReserve,
  //     partySize,
  //   }))
  //   .then(() => {
  //     callback();
  //   })
  //   .catch((err) => { throw err; });
  pool.query(`INSERT INTO reservations (restaurantid, date, time, party, string) VALUES (${restaurantID}, ${dateToReserve}, ${timeToReserve}, ${partySize}, 'INSERT');`)
    .then(result => callback(false, result))
    .catch(err => callback(true, err));
};

const getReservations = (restaurantID, dateToReserve, callback) => {

  pool.query(`SELECT * FROM reservations WHERE restaurantid = ${restaurantID}`)
    .then((results) => {
      callback(false, results.rows);
    })
    .catch(err => callback(true, err));
  // Reservations.sync()
  //   .then(() => {
  //     return Reservations.findAll({
  //       where: {
  //         restaurantID,
  //         dateToReserve,
  //       },
  //     });
  //   })
  //   .then(results => callback(JSON.stringify(results)))
  //   .catch((err) => { throw err; });
};

module.exports = {
  addRestaurant,
  addReservation,
  getReservations,
};