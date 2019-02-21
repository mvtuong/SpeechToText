# Speech to text (MERN Stack)

Application that allows users to upload/record speech/conversation of up to 60 minutes, translates the audio and sends a text transcript to the user’s email upon completion.

This project uses the following technologies:

- [MongoDB](https://www.mongodb.com/) for the database
- [Express](http://expressjs.com/) together with [Node](https://nodejs.org/en/) for the backend
- [React](https://reactjs.org) and [React Router](https://reacttraining.com/react-router/) for frontend
- [Google Speech To Text](https://cloud.google.com/speech-to-text/) and [Google Cloud Storage](https://cloud.google.com/storage/)
- [Jest](https://jestjs.io/en/) and [Enzyme](https://airbnb.io/enzyme/) for testing
- [Passport](https://www.npmjs.com/package/passport) and [JWTs](https://www.npmjs.com/package/passport-jwt) for authentication
- [Socket.io](https://socket.io/) for handling streaming.
- [Eslint](https://eslint.org/) for clean coding style.

## Features

- Register / Login / Logout using JWTs for authentication.
- Allow upload / record audio up to 60 minutes. You can even upload an audio and record your speech at the same time.
- Support multi languages and punctuation.
- Transcribe audio recorded by microphone in real time. For audio file, handle 2 channels audio and support LINEAR16 / FLAC encoding.
- Sending email after transcribing.
- Store user previous transcripts.
- Testing: Snapshot, Unit, Interaction, Mock, Database.

## Configuration

Make sure to add your own `MONGOURI` from your [mLab](http://mlab.com) database and your email credentials (to send email using nodemailer) in `config/keys.js`.
```javascript
module.exports = {
  mongoURI: "YOUR_MONGO_URI_HERE",
  secretOrKey: "secret",
  username: Your email username,
  password: Your email password,
};
```
Also, you need your set the environment variable GOOGLE_APPLICATION_CREDENTIALS to the file path of the JSON file that contains your service account key.
```shell
export GOOGLE_APPLICATION_CREDENTIALS="./config/credentials.json"
```
## Quick Start

```javascript
// Install dependencies for server & client
npm install && npm run client-install

// Run client & server with concurrently
npm run dev

// Run test on client & server concurrently
npm run dev-test

// Server runs on http://localhost:5000 and client on http://localhost:3000
```

Live version can be found here [career-foundry.herokuapp.com](https://career-foundry.herokuapp.com)

You can find sample audio files in `dist` folder.
