const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./routes/router');

const PORT = process.env.PORT || 3000;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json());
app.use(express.json());
app.use((req, _res, next) => {
  // eslint-disable-next-line no-console
  console.log(req.body);
  req.user = {
    _id: '647764bc5c523f9b60600f7d',
  };

  next();
});

// app.get('/test', (req, res) => {
//   res.send('test info1');
// });

app.use(router);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
