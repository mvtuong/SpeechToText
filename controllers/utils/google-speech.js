const speech = require('@google-cloud/speech');

module.exports = async function main(gcsUri, clientConfig) {
  // Creates a client
  const client = new speech.SpeechClient();

  const config = {
    encoding: clientConfig.isFlacEncoding ? 'FLAC' : 'LINEAR16',
    languageCode: clientConfig.language,
    audioChannelCount: clientConfig.numberOfChannels,
    enableSeparateRecognitionPerChannel: true,
    enableAutomaticPunctuation: clientConfig.punctuation,
  };

  const audio = {
    uri: gcsUri,
  };

  const request = {
    config,
    audio,
  };

  const [operation] = await client.longRunningRecognize(request);
  const [response] = await operation.promise();
  const transcription = response.results
    .map(result => result.alternatives[0].transcript)
    .join('\n');
  // console.log(`Transcription: \n${transcription}`);
  return transcription;
};
