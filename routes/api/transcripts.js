const express = require('express');

const router = express.Router();

// Load transcript controller
const { getTranscript } = require('../../controllers/transcripts');

// @route GET api/transcripts/get
// @desc get transcript information (date, text)
// @access Private
router.get('/get', getTranscript);

module.exports = router;
