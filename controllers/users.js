/* eslint-disable compat/compat */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

// Load input validation
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

// Load User model
const User = require('../models/User');

const generateBearer = () => {
  let res = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < 7; i += 1) {
    res += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return res;
};

// @desc Register user
const registerUser = (req, res) => {
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return Promise.resolve(res.status(400).json(errors));
  }

  return User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json(['Email already exists']);
    }
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });

    // Hash password before saving in database
    return bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (error, hash) => {
        if (error) {
          throw error;
        }
        newUser.password = hash;
        newUser
          .save()
          .then(userData => res.json(userData))
          .catch(e => console.error('User save error: ', e));
      });
    });
  });
};

// @desc Login user and return JWT token
const loginUser = (req, res) => {
  // Form validation

  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return Promise.resolve(res.status(400).json(errors));
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  return User.findOne({ email }).then((user) => {
    // Check if user exists
    if (!user) {
      return res.status(404).json(['Email not found']);
    }

    // Check password
    return bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name
        };

        // Sign token
        return jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: generateBearer() + token
            });
          }
        );
      }
      return res
        .status(400)
        .json(['Password incorrect']);
    });
  });
};

// @desc get user information (name, transcripts)
const getUserInfo = (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return Promise.resolve(res.status(401).json(['No token provided']));
  }

  const realToken = token.substr(7); // Remove Bearer

  return jwt.verify(realToken, keys.secretOrKey, (err, decoded) => {
    if (err) {
      return res.status(500).json(['Failed to authenticate token']);
    }

    // Get transcript date only to save bandwidth
    return User.findOne({ _id: decoded.id }).populate('transcripts', 'date').then((user) => {
      res.status(200).json({
        name: user.name,
        transcripts: user.transcripts,
      });
    });
  });
};

module.exports = {
  registerUser,
  loginUser,
  getUserInfo,
};
