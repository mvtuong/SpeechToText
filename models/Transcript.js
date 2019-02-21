const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Create Schema
const TranscriptSchema = new Schema({
  date: {
    type: Date,
    default: Date.now
  },
  text: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('transcript', TranscriptSchema);
