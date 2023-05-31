const { STATUS_INTERNAL_SERVER_ERROR, STATUS_NOT_FOUND, STATUS_BAD_REQUEST } = require('../utils/constants');

const userSchema = require('../models/user');

module.exports.getUsers = (req, res) => {
  userSchema
    .find({})
    .then((users) => res.send(users))
    .catch(() => res
      .status(STATUS_INTERNAL_SERVER_ERROR)
      .send({ message: 'Default error' }));
};

module.exports.getUserById = (req, res) => {
  const { userId } = req.params;
  // eslint-disable-next-line no-console
  console.log(userId);

  userSchema
    .findById(userId)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res
          .status(STATUS_BAD_REQUEST)
          .send({ message: 'Bad Request' });
      }

      if (err.name === 'DocumentNotFoundError') {
        return res
          .status(STATUS_NOT_FOUND)
          .send({ message: 'User with _id cannot be found' });
      }

      return res
        .status(STATUS_INTERNAL_SERVER_ERROR)
        .send({ message: 'Default error' });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  // eslint-disable-next-line no-console
  console.log(req.body);

  userSchema
    .create({
      name,
      about,
      avatar,
    })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(STATUS_BAD_REQUEST)
          .send({ message: 'Invalid data to create user' });
      } else {
        res
          .status(STATUS_INTERNAL_SERVER_ERROR)
          .send({ message: 'Default error' });
      }
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;

  userSchema
    .findByIdAndUpdate(
      req.user._id,
      {
        name,
        about,
      },
      {
        new: true,
        runValidators: true,
      },
    )
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res
          .status(STATUS_BAD_REQUEST)
          .send({ message: 'Invalid data to update user' });
      }

      return res
        .status(STATUS_INTERNAL_SERVER_ERROR)
        .send({ message: 'Default error' });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  userSchema
    .findByIdAndUpdate(
      req.user._id,
      { avatar },
      {
        new: true,
        runValidators: true,
      },
    )
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(STATUS_BAD_REQUEST)
          .send({ message: 'Invalid data to update avatar' });
      } else {
        res
          .status(STATUS_INTERNAL_SERVER_ERROR)
          .send({ message: 'Default error' });
      }
    });
};
