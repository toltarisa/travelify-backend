const User = require('../model/User');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  ignoreTLS: false,
  auth: {
    user: process.env.NODEMAILER_TRANSPORTER_USER,
    pass: process.env.NODEMAILER_TRANSPORTER_PASS,
  },
});

function handleErrors(err) {
  let error = { name: '', lastname: '', email: '', password: '', username: '' };

  if (err.message === 'incorrect email')
    error.email = 'that email is not registered in the database';

  if (err.message === 'incorrect password')
    error.password = 'that password is incorrect';

  if (err.code === 11000) {
    error.email = 'email is already exists in the database';
    return error;
  }

  if (err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      error[properties.path] = properties.message;
    });
  }

  return error;
}

const MAX_AGE = 3 * 24 * 60 * 60;

function createToken(id) {
  return jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: MAX_AGE });
}

async function signup(req, res) {
  const { name, lastname, email, username, password, role } = req.body;

  try {
    const user = await User.create({
      name,
      lastname,
      email,
      password,
      username,
      role,
    });

    const token = createToken(user._id);

    res.cookie('jwt', token, { httpOnly: true, maxAge: MAX_AGE });

    res.status(201).json({ user: user._id });
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json(errors);
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    const token = createToken(user._id);

    res.cookie('jwt', token, { httpOnly: true, maxAge: MAX_AGE });

    res.status(200).json({
      userId: user._id,
      token: token,
      username: user.username,
      role: user.role,
    });
  } catch (error) {
    const errors = handleErrors(error);

    res.status(400).json(errors);
  }
}

function logout(req, res) {
  res.cookie('jwt', '', { maxAge: 1 });
  res.status(200).json({ message: 'successfully logged out!' });
}

function forgotPassword(req, res) {
  const { email } = req.body;

  User.findOne({ email }).then(function (user) {
    if (!user)
      return res.status(401).json({
        message:
          'The email address ' +
          email +
          ' is not associated with any account. Double-check your email address and try again.',
      });
    user.generatePassword();

    user.save().then(function (user) {
      let token = `${user.resetPasswordToken}`;
      const mailOptions = {
        from: 'travelify@support.com',
        to: email,
        subject: 'Travelify password reset',
        text: `Hi ${user.username} \n 
        Please enter this token :  ${token} to confirmation box to reset your password. \n\n 
        If you did not request this, please ignore this email and your password will remain unchanged.\n`,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) return res.status(500).json({ message: error.message });

        res.status(200).json({
          message: 'A reset email has been sent to ',
          info: info,
        });
      });
    });
  });
}

async function reset(req, res) {
  const { password, token } = req.body;

  try {
    const user = await User.findOne({ resetPasswordToken: token });

    if (!user)
      return res
        .status(401)
        .json({ message: 'Password reset token is invalid or has expired.' });

    user.password = password;
    user.resetPasswordToken = undefined;

    user.save().then(function (user) {
      const mailOptions = {
        to: user.email,
        from: 'travelify@support.com',
        subject: 'Your password has been changed',
        text: `Hi ${user.username} \n 
        This is a confirmation that the password for your account ${user.email} has just been changed.\n`,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) return res.status(500).json({ message: error.message });

        res.status(200).json({
          message: 'A reset email has been sent to ',
          info: info,
        });
      });
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

exports.authService = {
  login,
  logout,
  reset,
  forgotPassword,
  signup,
};
