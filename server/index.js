const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static(`${__dirname}/../client/dist`));
app.use(bodyParser());


const port = 8080;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
