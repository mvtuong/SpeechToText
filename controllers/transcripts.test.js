/* global jest, expect */
const mockingoose = require('mockingoose').default;
const Transcript = require('../models/Transcript');
const { getTranscript } = require('./transcripts');

describe('Test mongoose getTranscript model', () => {
  const _transcript = {
    text: 'Test Text',
  };

  beforeEach(() => {
    mockingoose.resetAll();
  });

  it('should return the transcript with findOne', () => {
    mockingoose.transcript.toReturn(_transcript, 'findOne');

    Transcript.findOne({ _id: 'any' }).then((transcript) => {
      expect(transcript.text).toEqual(_transcript.text);
    });
  });

  it('should return new transcript with save', () => {
    const newTranscript = new Transcript(_transcript);

    mockingoose.transcript.toReturn(_transcript, 'save');

    newTranscript.save().then((transcript) => {
      expect(transcript.date).toBeDefined(); // Auto generated
      expect(transcript.text).toEqual(_transcript.text);
    });
  });
});

describe('Test controllers', () => {
  let res;

  beforeEach(() => {
    mockingoose.resetAll();
    res = {
      json: jest.fn(),
      status: jest.fn(),
    };
  });

  it('Calls getTranscript without token', async () => {
    const invalidReq = {
      headers: {},
    };

    let statusCode;
    res.status.mockImplementationOnce((code) => {
      statusCode = code;
      return { json: jest.fn(data => data) };
    });
    const data = getTranscript(invalidReq, res);
    expect(statusCode).toEqual(401);
    expect(data[0]).toEqual('No token provided');
  });

  it('Calls getTranscript without id', async () => {
    const invalidReq = {
      headers: {
        authorization: 'token',
      },
    };

    let statusCode;
    res.status.mockImplementationOnce((code) => {
      statusCode = code;
      return { json: jest.fn(data => data) };
    });
    const data = getTranscript(invalidReq, res);
    expect(statusCode).toEqual(401);
    expect(data[0]).toEqual('No id provided');
  });
});
