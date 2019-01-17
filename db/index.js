const { Pool } = require('pg');
const config = require('./config.js');

const pool = new Pool(config);

const addReservation = (restaurantID, dateToReserve, timeToReserve, partySize, callback) => {
  pool.query(`INSERT INTO reservations (restaurantid, date, time, party, string) VALUES (${restaurantID}, ${dateToReserve}, ${timeToReserve}, ${partySize}, 'INSERT');`)
    .then(result => callback(null, result))
    .catch(err => callback(err));
};

const getReservations = (restaurantID, dateToReserve, callback) => {
  pool.query(`SELECT * FROM reservations WHERE restaurantid = ${restaurantID} AND date = ${dateToReserve}`)
    .then(results => callback(null, results.rows))
    .catch(err => callback(err));
};

const deleteReservation = (restaurantID, dateToDelete, timeToDelete, callback) => {
  pool.query(`DELETE FROM reservations WHERE restaurantid = ${restaurantID} AND date = '${dateToDelete}' AND time = '${timeToDelete}'`)
    .then(() => callback(null))
    .catch(err => callback(err));
};

const updateReservation = (restaurantID, oldDate, oldTime, newDate, newTime, callback) => {
  pool.query(`UPDATE reservations SET date = '${newDate}', time = ${newTime} WHERE restaurantid = ${restaurantID} AND date = '${oldDate}' AND time = '${oldTime}'`)
    .then(response => callback(null, response))
    .catch(err => callback(err));
};

module.exports = {
  addReservation,
  getReservations,
  deleteReservation,
  updateReservation,
};
