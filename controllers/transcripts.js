const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

// Load transcript model
const Transcript = require('../models/Transcript');

// @desc get transcript information (date, text)
const getTranscript = (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json(['No token provided']);
  }

  if (!req.query || !req.query.id) {
    return res.status(401).json(['No id provided']);
  }

  const realToken = token.substr(7); // Remove Bearer

  return jwt.verify(realToken, keys.secretOrKey, (err) => {
    if (err) {
      return res.status(500).json(['Failed to authenticate token']);
    }

    return Transcript.findOne({ _id: req.query.id }).then((transcript) => {
      res.status(200).json({
        transcript,
      });
    });
  });
};

module.exports = { getTranscript };
