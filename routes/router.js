const router = require('express').Router();
const { createUser, login } = require('../controllers/users');
const NotFoundError = require('../errors/NotFoundError');

const userRoutes = require('./users');
const cardRoutes = require('./cards');

router.use('/users', userRoutes);
router.use('/cards', cardRoutes);
router.post('/signin', login);
router.post('/signup', createUser);
router.use('/*', (req, res, next) => {
  next(new NotFoundError('This page does not exist'));
});

module.exports = router;
