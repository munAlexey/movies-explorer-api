const mongoose = require('mongoose');

const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: 'Invalid email',
    },
  },
  password: {
    required: true,
    type: String,
    select: false,
  },
});

userSchema.methods.toJSON = function () {
  const data = this.toObject();

  delete data.password;

  delete data.__v;

  return data;
};

module.exports = mongoose.model('user', userSchema);
