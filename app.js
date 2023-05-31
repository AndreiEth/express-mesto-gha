const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/router');

const PORT = process.env.PORT || 3000;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.json());
app.use((req, _res, next) => {
  req.user = {
    _id: '5d8b8592978f8bd833ca8133',
  };

  next();
});

// app.get('/test', (req, res) => {
//   res.send('test info1');
// });

app.use(router);

// eslint-disable-next-line no-console
console.log(router);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
