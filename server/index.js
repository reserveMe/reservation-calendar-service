const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('../db');


const app = express();

app.use('/restaurants/:id/', express.static(`${__dirname}/../client/dist`));
app.use(bodyParser());
app.use(cors());

app.get('/api/reservations/restaurantID=:restaurantID&date=:date', (req, res) => {
  console.log('IN GET');
  db.getReservations(req.params.restaurantID, req.params.date, (err, results) => {
    if (err) {
      console.log(err);
      res.sendStatus(400);
    } else {
      res.send(results);
    }
  });
});

app.post('/api/reservations/', (req, res) => {
  console.log(req.body);
  db.addReservation(req.body.restaurantID, req.body.date, req.body.time, req.body.partySize, (err) => {
    if (err) {
      console.log(err);
      res.sendStatus(400);
    } else {
      res.end('Reservation Created');
    }
  });
});

app.delete('/api/reservations', (req, res) => {
  db.deleteReservation(req.body.restaurantID, req.body.date, req.body.time, (err) => {
    if (err) {
      console.log(err);
      res.sendStatus(400);
    } else {
      res.end('Reservation Deleted');
    }
  });
});

app.patch('/api/reservations', (req, res) => {
  db.updateReservation(req.body.restaurantID, req.body.oldDate, req.body.oldTime, req.body.newDate, req.body.newTime, (err, response) => {
    if (err) {
      console.log(err);
      res.sendStatus(400);
    } else {
      res.end('UPDATED');
    }
  });
});

const port = 3002;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
