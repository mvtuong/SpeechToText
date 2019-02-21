const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const speech = require('@google-cloud/speech');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const keys = require('./config/keys');
const users = require('./routes/api/users');
const transcripts = require('./routes/api/transcripts');
const audio = require('./routes/api/audio');
const sendEmail = require('./controllers/utils/email');
// Load User and Transcript model
const User = require('./models/User');
const Transcript = require('./models/Transcript');

// Google Cloud
const speechClient = new speech.SpeechClient(); // Creates a client

const defaultSpeechRequest = {
  config: {
    encoding: 'LINEAR16',
    sampleRateHertz: 16000,
    languageCode: 'en-US',
    // profanityFilter: false,
    // enableWordTimeOffsets: true,
  },
  interimResults: true,
};

const app = express();

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// DB Config
const db = keys.mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB successfully connected'))
  .catch(err => console.log('MongoDB error: ', err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require('./config/passport')(passport);

// Routes
app.use('/api/users', users);
app.use('/api/transcripts', transcripts);
app.use('/api/audio', audio);

// For deloying
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;
// Use socket.io in conjunction with Express
const server = http.createServer(app);
const io = socketIo(server);

// Middleware
io.use((socket, next) => {
  const token = (socket.handshake.query || {}).token;
  if (!token) {
    return next(new Error('Authentication error'));
  }

  jwt.verify(token.substr(7), keys.secretOrKey, (err, decoded) => {
    if (err) {
      return next(new Error('Authentication error'));
    }
    // eslint-disable-next-line no-param-reassign
    socket.decoded = decoded;
    return next();
  });

  return next(new Error('Authentication error'));
});

io.on('connection', (socket) => {
  const userId = socket.decoded.id;
  let recognizeStream = null;
  let transcriptText = '';
  let interimText = '';
  let clientConfig;

  const stopStream = (submit) => {
    const finalText = transcriptText + interimText;
    if (finalText && submit) {
      User.findOne({ _id: userId }).then((user) => {
        const transcript = new Transcript({
          text: finalText,
        });
        transcript.save();
        user.transcripts.push(transcript._id);
        user.save();
        transcriptText = '';
        sendEmail(user.email, user.name, transcript.date, transcript.text);
      });
    }
    if (recognizeStream) {
      recognizeStream.end();
    }
    recognizeStream = null;
  };

  const startStream = () => {
    const request = {
      ...defaultSpeechRequest,
      config: {
        ...defaultSpeechRequest.config,
        languageCode: clientConfig.language,
        enableAutomaticPunctuation: clientConfig.punctuation,
      }
    };
    recognizeStream = speechClient
      .streamingRecognize(request)
      .on('error', (err) => {
        console.error('Speech streaming error: ', err);
        stopStream();
        startStream();
      })
      .on('data', (data) => {
        // console.log(data.results[0].alternatives[0].transcript);
        const isFinal = data.results[0].isFinal;
        if (isFinal) {
          transcriptText += `${data.results[0].alternatives[0].transcript}\n`;
          interimText = '';
          stopStream();
          startStream();
        } else {
          interimText = data.results[0].alternatives[0].transcript;
        }

        socket.emit('result',
          {
            text: data.results[0].alternatives[0].transcript,
            isFinal,
          });
      });
  };

  socket.on('streamStart', (data) => {
    clientConfig = data;
    startStream();
  });

  socket.on('streaming', (data) => {
    if (recognizeStream !== null) {
      recognizeStream.write(data);
    }
  });

  socket.on('streamEnd', () => {
    stopStream(true);
  });

  socket.on('disconnect', () => {
    // Send a backup transcription to user in case of disconnecting
    stopStream(true);
  });
});

server.listen(port, () => console.log(`Server up and running on port ${port} !`));
