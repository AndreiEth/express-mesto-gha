const {
  STATUS_INTERNAL_SERVER_ERROR,
  STATUS_NOT_FOUND,
  STATUS_BAD_REQUEST,
} = require('../utils/constants');

const cardSchema = require('../models/card');

module.exports.getCards = (req, res) => {
  cardSchema
    .find({})
    .then((cards) => res.status(200).send(cards))
    .catch(() => res
      .status(STATUS_INTERNAL_SERVER_ERROR)
      .send({ message: 'Default error' }));
};

module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;

  cardSchema
    .findByIdAndRemove(cardId)
    .then((card) => {
      if (!card) {
        return res
          .status(STATUS_NOT_FOUND)
          .send({ message: 'Not found: Invalid _id' });
      }

      return res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(STATUS_BAD_REQUEST)
          .send({ message: 'Card with _id cannot be found' });
      } else {
        res
          .status(STATUS_INTERNAL_SERVER_ERROR)
          .send({ message: 'Default error' });
      }
    });
};

module.exports.createCard = (req, res) => {
  // eslint-disable-next-line no-console
  console.log(req.user._id);
  const { name, link } = req.body;
  const owner = req.user._id;

  cardSchema
    .create({
      name,
      link,
      owner,
    })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(STATUS_BAD_REQUEST)
          .send({ message: 'Invalid data for card crestion' });
      } else {
        res
          .status(STATUS_INTERNAL_SERVER_ERROR)
          .send({ message: 'Default error' });
      }
    });
};

module.exports.addLike = (req, res) => {
  cardSchema
    .findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    )
    .then((card) => {
      if (!card) {
        return res
          .status(STATUS_NOT_FOUND)
          .send({ message: 'Not found: Invalid _id' });
      }

      return res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res
          .status(STATUS_BAD_REQUEST)
          .send({ message: 'Invalid data to add like' });
      }

      return res
        .status(STATUS_INTERNAL_SERVER_ERROR)
        .send({ message: 'Default error' });
    });
};

module.exports.deleteLike = (req, res) => {
  cardSchema
    .findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    )
    .then((card) => {
      if (!card) {
        return res
          .status(STATUS_NOT_FOUND)
          .send({ message: 'Not found: Invalid _id' });
      }

      return res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        return res
          .status(STATUS_BAD_REQUEST)
          .send({ message: 'Invalid data to delete like' });
      }

      return res
        .status(STATUS_INTERNAL_SERVER_ERROR)
        .send({ message: 'Default error' });
    });
};
