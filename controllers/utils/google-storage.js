// https://gist.github.com/nparsons08/4eb23c5a8e205272e3b382730be617fe#file-controller-js

const uuid = require('uuid/v4');
const mime = require('mime-types');
const { Storage } = require('@google-cloud/storage');
const speech = require('./google-speech');
const User = require('../../models/User');
const Transcript = require('../../models/Transcript');
const sendEmail = require('./email');

exports.create = async (req, res) => {
  const type = mime.lookup(req.file.originalname);

  const storage = new Storage();

  const bucket = storage.bucket('career-foundry');
  const blob = bucket.file(`${uuid()}.${mime.extensions[type][0]}`);

  const stream = blob.createWriteStream({
    resumable: true,
    contentType: type,
    // predefinedAcl: 'publicRead',
  });

  stream.on('error', (err) => {
    console.error('Error uploading GCS: ', err);
    return res.status(500).json(['Error on uploading file (gcs). Please try again.']);
  });

  stream.on('finish', () => {
    const gcsUri = `gs://${bucket.name}/${blob.name}`;
    // Header fields name becomes lowercase, their value is coverted to string
    // so revert them here
    const config = {
      language: req.headers.language,
      punctuation: req.headers.punctuation === 'true',
      numberOfChannels: +req.headers.numberofchannels,
      sampleRate: +req.headers.samplerate,
      isFlacEncoding: req.headers.isflacencoding === 'true',
    };

    speech(gcsUri, config)
      .then((transcription) => {
        // Delete file after transcribing
        blob.delete();
        // console.log(`https://storage.googleapis.com/${bucket.name}/${blob.name}`);
        User.findOne({ _id: req.userId }).then((user) => {
          const transcript = new Transcript({
            text: transcription,
          });
          transcript.save();
          user.transcripts.push(transcript._id);
          user.save();
          sendEmail(user.email, user.name, transcript.date, transcript.text);
        });
        res.status(200).json({ transcription });
      }).catch((err) => {
        console.error('Error transcribing: ', err);
        // Delete file in case of error
        blob.delete();
        return res.status(500).json(['The audio encoding is not supported. Please try another one.']);
      });
  });

  stream.end(req.file.buffer);
};
