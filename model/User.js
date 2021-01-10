const mongoose = require('mongoose');
const validator = require('validator');
const crypto = require('crypto');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'please enter your name'],
    unique: false,
  },
  lastname: {
    type: String,
    required: [true, 'please enter your lastname'],
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'please enter your email adress'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'please enter a valid email'],
  },
  username: {
    type: String,
    required: [true, 'please enter your username'],
  },
  password: {
    type: String,
    required: [true, 'please enter your password'],
    minlength: [6, 'minimum password length is 6 characters'],
  },
  role: {
    type: String,
    default: 'user',
    enum: ['user', 'admin'],
  },
  resetPasswordToken: {
    type: String,
    required: false,
  },
});

userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error('incorrect password');
  }
  throw Error('incorrect email');
};

userSchema.methods.generatePassword = function () {
  this.resetPasswordToken = crypto.randomBytes(20).toString('hex');
};

const User = mongoose.model('user', userSchema);

module.exports = User;
