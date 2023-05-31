const router = require('express').Router();
const { STATUS_NOT_FOUND } = require('../utils/constants');

const userRoutes = require('./users');
const cardRoutes = require('./cards');

router.use('/users', userRoutes);
router.use('/cards', cardRoutes);
router.use('/*', (req, res) => {
  res.status(STATUS_NOT_FOUND).send({ message: '404: Not Found' });
});

module.exports = router;
