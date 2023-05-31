const mongoose = require('mongoose');
const isURL = require('validator/lib/isURL');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
      default: 'Жак-Ив Кусто',
    },
    about: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
      default: 'Исследователь',
    },
    avatar: {
      type: String,
      required: true,
      default:
        'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
      validate: {
        validator: (url) => isURL(url),
        message: 'incorrect link format',
      },
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('user', userSchema);
