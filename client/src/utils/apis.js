const axios = require('axios');
const jwtDecode = require('jwt-decode');

const setAuthToken = (token) => {
  if (token) {
    // Apply authorization token to every request if logged in
    axios.defaults.headers.common.Authorization = token;
  } else {
    // Delete auth header
    delete axios.defaults.headers.common.Authorization;
  }
};

// USER APIS
// Log user out
const logoutUser = () => {
  localStorage.removeItem('token');
  setAuthToken(false);
};

const isDeviceActivated = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return false;
  }

  if (jwtDecode(token).exp < Date.now() / 1000) {
    logoutUser();
    return false;
  }

  setAuthToken(token);
  return true;
};

const getUserInfo = () => axios.get('/api/users/account');

// Register User
const registerUser = ({ name, email, password }) =>
  axios.post('/api/users/register', { name, email, password });

// Log user in
const loginUser = ({ email, password }) =>
  axios.post('/api/users/login', { email, password })
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem('token', token);
      setAuthToken(token);
      return true;
    });

// TRANSCRIPTS API
const getTranscript = id =>
  axios.get('/api/transcripts/get', {
    params: {
      id
    }
  });

// AUDIO API
const uploadAudio = (audioData, onUploadProgress, extra) => {
  const formData = new FormData();
  formData.append('track', audioData);
  const config = {
    onUploadProgress, // TO SHOW UPLOAD STATUS
    headers: {
      'content-type': 'multipart/form-data',
      language: extra.language,
      punctuation: extra.punctuation,
      numberOfChannels: extra.numberOfChannels,
      sampleRate: extra.sampleRate,
      isFlacEncoding: extra.isFlac,
    }
  };
  return axios.post('/api/audio/upload', formData, config);
};

module.exports = {
  isDeviceActivated,
  getUserInfo,
  getTranscript,
  registerUser,
  loginUser,
  logoutUser,
  uploadAudio,
};
