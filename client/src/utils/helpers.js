const toLocaleDate = date => (new Date(date)).toLocaleString();

const toTime = (seconds) => {
  if (seconds < 0 || seconds > 3600) {
    return '--:--';
  }
  let min = Math.floor(seconds / 60);
  if (min.toString().length === 1) {
    min = `0${min}`;
  }
  let s = seconds % 60;
  if (s.toString().length === 1) {
    s = `0${s}`;
  }
  return `${min}:${s}`;
};

// https://github.com/vin-ni/Google-Cloud-Speech-Node-Socket-Playground
const downsampleBuffer = (buffer, sampleRate, outSampleRate) => {
  if (outSampleRate === sampleRate) {
    return buffer;
  }
  if (outSampleRate > sampleRate) {
    throw new Error('downsampling rate show be smaller than original sample rate');
  }
  const sampleRateRatio = sampleRate / outSampleRate;
  const newLength = Math.round(buffer.length / sampleRateRatio);
  const result = new Int16Array(newLength);
  let offsetResult = 0;
  let offsetBuffer = 0;

  while (offsetResult < result.length) {
    const nextOffsetBuffer = Math.round((offsetResult + 1) * sampleRateRatio);
    let accum = 0;
    let count = 0;
    for (let i = offsetBuffer; i < nextOffsetBuffer && i < buffer.length; i += 1) {
      accum += buffer[i];
      count += 1;
    }

    result[offsetResult] = Math.min(1, accum / count) * 0x7FFF;
    offsetResult += 1;
    offsetBuffer = nextOffsetBuffer;
  }

  return result.buffer;
};

module.exports = {
  toLocaleDate,
  toTime,
  downsampleBuffer,
};
