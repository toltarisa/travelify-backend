const User = require('../model/User');
const jwt = require('jsonwebtoken');

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

module.exports.login = login;
module.exports.signup = signup;
module.exports.logout = logout;
