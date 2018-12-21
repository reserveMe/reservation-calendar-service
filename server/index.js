const express = require('express');
const bodyParser = require('body-parser');
const db = require('../db');

const app = express();

app.use(express.static(`${__dirname}/../client/dist`));
app.use(bodyParser());

app.get('/reservations/restaurantID=:restaurantID&date=:date&time=:time&partySize=:partySize', (req, res) => {
  db.getReservations(req.params.restaurantID, req.params.date, (results) => {
    console.log('results', JSON.parse(results));
    res.end(results);
  });
});

app.post('/reservations/restaurantID=:restaurantID&date=:date&time=:time&partySize=:partySize', (req, res) => {
  db.addReservation(req.params.restaurantID, req.params.date, req.params.time, req.params.partySize, () => {
    res.end();
  });
})

const port = 3002;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
