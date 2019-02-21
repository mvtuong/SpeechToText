import React from 'react';
import { Redirect } from 'react-router-dom';
import io from 'socket.io-client';
import { getTranscript, getUserInfo, logoutUser, uploadAudio } from '../utils/apis';
import { toLocaleDate, toTime, downsampleBuffer } from '../utils/helpers';
import { languages } from '../utils/languages';
import Modal from './Modal';

class Account extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      transcripts: [],
      showModal: false,
      modalTitle: '',
      modalText: '',
      seconds: 3600,
      recordMode: true,
      punctuation: true,
      uploadPercentage: 0,
    };

    this.timer = null;
    this.context = null;
    this.processor = null;
    this.streamObj = null;
  }

  componentDidMount() {
    this.getUserInfo();

    this.socket = io({
      query: {
        token: localStorage.getItem('token'),
      }
    });

    this.socket.on('result', (data) => {
      if (data.isFinal) {
        this.result.firstChild.innerText += `${data.text}\n`;
        this.result.lastChild.innerText = '';
      } else if (!this.result.lastChild.innerText.includes(data.text)) {
        this.result.lastChild.innerText = data.text;
      }
    });

    if (!navigator.getUserMedia) {
      navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia
        || navigator.mozGetUserMedia || navigator.msGetUserMedia;
    }

    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const context = new AudioContext();
    const processor = context.createScriptProcessor(2048, 1, 1); // Buffer size: 2048

    processor.connect(context.destination);

    processor.onaudioprocess = (e) => {
      if (!this.state.recording) {
        return;
      }
      const left = e.inputBuffer.getChannelData(0);
      const left16 = downsampleBuffer(left, 44100, 16000);
      this.socket.emit('streaming', left16);
    };
    this.processor = processor;
    this.contextObj = context;
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  getUserInfo = () => {
    getUserInfo().then((info) => {
      const name = info.data.name;
      let transcripts = [];
      if (info.data.transcripts) {
        // Sort by date
        transcripts = info.data.transcripts
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      }
      this.setState({ name, transcripts });
    }).catch((err) => {
      logoutUser();
      this.showModal('Error', err.response ? err.response.data[0] : err);
    });
  }

  signOutClicked = () => {
    logoutUser();
    this.setState({
      isLoggedOut: true,
    });
  }

  transcriptItemClicked = (ev) => {
    ev.preventDefault();
    const transcriptId = ev.target.dataset.id;
    getTranscript(transcriptId)
      .then((res) => {
        const transcript = res.data.transcript;
        this.showModal(toLocaleDate(transcript.date), transcript.text);
      }).catch(err => this.showModal('Error', err.response ? err.response.data[0] : err));
  }

  onModalClose = () => {
    this.setState({
      showModal: false,
      modalTitle: '',
      modalText: '',
    });
  }

  showModal = (title, text) => {
    this.setState({
      showModal: true,
      modalTitle: title,
      modalText: text.toString(), // To prevent crash on unexpected error
    });
  }

  handleSuccess = (stream) => {
    this.socket.emit('streamStart',
      {
        language: this.select.options[this.select.selectedIndex].value,
        punctuation: this.state.punctuation,
      });
    this.result.firstChild.innerText = '';

    this.setState({ recording: true });
    this.timer = setInterval(() => {
      if (this.state.seconds <= 0) {
        this.stopRecording();
        return;
      }

      this.setState(prevState => ({
        seconds: prevState.seconds - 1,
      }));
    }, 1000);

    this.contextObj.resume();
    this.streamObj = stream;
    const source = this.contextObj.createMediaStreamSource(stream);
    source.connect(this.processor);
  };

  startRecording = () => {
    if (navigator.getUserMedia) {
      navigator.getUserMedia(
        { audio: true },
        this.handleSuccess,
        (e) => {
          console.error('Error on capturing audio: ', e);
          this.showModal('Error', 'Error on capturing audio');
        },
      );
    } else {
      this.showModal('Error', 'getUserMedia is not supported in this browser');
    }
  }

  stopRecording = () => {
    this.socket.emit('streamEnd', '');
    clearInterval(this.timer);
    this.setState({ recording: false, seconds: 3600 });
    if (this.streamObj) {
      const mediaTracks = this.streamObj.getTracks();
      mediaTracks.forEach(mediaTrack => mediaTrack.stop());
    }
    setTimeout(() => {
      this.getUserInfo();
    }, 2500);
  }

  recordMode(value) {
    this.setState({ recordMode: value });
  }

  onSwitcherClicked = (ev) => {
    ev.target.classList.toggle('active');
    const active = ev.target.classList.contains('active');
    this.setState({ punctuation: active });
  }

  onUploadProgress = (ev) => {
    this.setState({ uploadPercentage: Math.floor(ev.loaded * 100 / ev.total) });
  }

  onFileChanged = (ev) => {
    const element = ev.target;
    this.result.firstChild.innerText = '';
    const reader = new FileReader();
    const audio = element.files[0];
    element.value = '';
    reader.onload = (e) => {
      const arrayBuffer = e.target.result;
      this.contextObj.decodeAudioData(arrayBuffer, (res) => {
        if (res.duration > 3600) {
          this.showModal('Error', 'Audio exceeds duration limit of 60 minutes');
          return;
        }

        this.setState({ uploading: true });
        const extra = {
          language: this.select.options[this.select.selectedIndex].value,
          punctuation: this.state.punctuation,
          numberOfChannels: res.numberOfChannels,
          sampleRate: res.sampleRate,
          isFlac: audio.type === 'audio/flac',
        };
        uploadAudio(audio, this.onUploadProgress, extra)
          .then((result) => {
            this.result.firstChild.innerText = result.data.transcription;
            this.setState({ uploading: false });
            setTimeout(() => {
              this.getUserInfo();
            }, 2500);
          }).catch((err) => {
            this.setState({ uploading: false });
            this.showModal('Error', err.response ? err.response.data[0] : err);
            console.error('Error transcribing: ', err);
          });
      }, (err) => {
        console.error('The file format is not supported: ', err);
        this.setState({ uploading: false });
        this.showModal('Error', 'The file format is not supported. Please try another file.');
      });
    };
    reader.readAsArrayBuffer(audio);
  }

  render() {
    if (this.state.isLoggedOut) {
      return (<Redirect to="/login" />);
    }

    return (
      <section>
        <div className="Account">
          <div className="page-title">
            <h3>Account</h3>
            <button
              type="button"
              className="link-button sign-out"
              onClick={this.signOutClicked}
            >
              Sign out
            </button>
          </div>
          <div className="content">
            <p className="username">
              {'Hello '}
              <span>{this.state.name}</span>
              {','}
            </p>
            <div className="tabs-wrapper">
              <button type="button" className={`tab ${this.state.recordMode ? 'active' : ''}`} onClick={() => this.recordMode(true)}>Record</button>
              <button type="button" className={`tab ${this.state.recordMode ? '' : 'active'}`} onClick={() => this.recordMode(false)}>Upload a File</button>
            </div>
            {this.state.recordMode
              ? (
                <div>
                  <button id="btn-record" type="button" className="button" onClick={this.state.recording ? this.stopRecording : this.startRecording}>
                    {this.state.recording ? 'Stop' : 'Start'}
                  </button>
                  <span className={`record-icon ${this.state.recording ? 'recording' : ''}`} />
                  <span>
                    {'Time remaining: '}
                    {toTime(this.state.seconds)}
                  </span>
                  <p className="tips">
                    (You will receive an email later with your transcription)
                  </p>
                </div>
              )
              : (
                <div>
                  <label id="track-label" className="button" htmlFor="track">SELECT FILE</label>
                  <input id="track" type="file" accept="audio/*" name="track" onChange={this.onFileChanged} />
                  <span>Audio file (max 60 minutes)</span>
                  <p className="tips">
                    {'(Please refer to the list of '}
                    <a target="_blank" rel="noopener noreferrer" className="link-button" href="https://cloud.google.com/speech-to-text/docs/encoding#audio-encodings">supported audio encodings</a>
                    {')'}
                  </p>
                  {this.state.uploading
                    && (
                    <div>
                      <div className="progress">
                        <span>Uploading: </span>
                        <progress value={this.state.uploadPercentage} max="100" />
                        <span>
                          {' '}
                          {this.state.uploadPercentage}
                          {'/100'}
                        </span>
                      </div>
                      {(this.state.uploadPercentage === 100)
                        && (
                        <p className="processing">
                          Transcribing audio
                          {' '}
                          <span>.</span>
                          <span>.</span>
                          <span>.</span>
                        </p>
                        )
                      }
                    </div>
                    )
                  }
                </div>
              )
            }
            <p className="result" ref={(input) => { this.result = input; }}>
              <span />
              <span />
            </p>

            <select ref={(input) => { this.select = input; }} defaultValue="en-US">
              {languages.map(language =>
                <option key={language.id} value={language.id}>{language.name}</option>)}
            </select>
            <div style={{ display: 'inline-block' }}>
              <span>Punctuation: </span>
              <button type="button" className="switcher active" onClick={this.onSwitcherClicked} />
            </div>

            {this.state.transcripts.length > 0
              && (
              <>
                <p className="separator" />
                <p className="previous-transcripts">Here is the list of your previous transcripts: </p>
                <ul>
                  {this.state.transcripts.map(transcript => (
                    <li key={transcript._id}>
                      <button
                        type="button"
                        className="link-button"
                        data-id={transcript._id}
                        onClick={this.transcriptItemClicked}
                      >
                        {toLocaleDate(transcript.date)}
                      </button>
                    </li>
                  ))}
                </ul>
              </>
              )
            }
          </div>
          {this.state.showModal
            && (
              <Modal
                onClose={this.onModalClose}
                title={this.state.modalTitle}
                text={this.state.modalText}
              />
            )
          }
        </div>
      </section>
    );
  }
}

export default Account;
