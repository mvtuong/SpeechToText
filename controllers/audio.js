const jwt = require('jsonwebtoken');
const multer = require('multer');
const keys = require('../config/keys');
const storage = require('./utils/google-storage');

// @desc Upload an audio to GCS
const uploadAndTranscribeAudio = (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json(['No token provided']);
  }

  const realToken = token.substr(7); // Remove Bearer

  return jwt.verify(realToken, keys.secretOrKey, (err, decoded) => {
    if (err) {
      return res.status(500).json(['Failed to authenticate token']);
    }

    req.userId = decoded.id; // Keep this user id for later use

    const upload = multer().single('track');
    return upload(req, res, (error) => {
      if (error instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        return res.status(500).json(['Error on uploading file (multer)']);
      } if (error) {
        // An unknown error occurred when uploading.
        return res.status(500).json(['Error on uploading file (unknown)']);
      }

      // Everything went fine.
      return storage.create(req, res);
    });
  });
};

module.exports = { uploadAndTranscribeAudio };
