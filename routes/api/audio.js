const express = require('express');

const router = express.Router();

// Load audio controller
const { uploadAndTranscribeAudio } = require('../../controllers/audio');

// @route POST api/audio/upload
// @desc Upload an audio to GCS
// @access Private
router.post('/upload', uploadAndTranscribeAudio);

module.exports = router;
