/* global expect, jest */
const mockingoose = require('mockingoose').default;
const User = require('../models/User');
const { registerUser, loginUser, getUserInfo } = require('./users');

describe('Test mongoose User model', () => {
  const _user = {
    name: 'Test Name',
    email: 'test@example.com',
    password: 'PASSWORD',
  };
  beforeEach(() => {
    mockingoose.resetAll();
  });

  it('should return the user with findOne', () => {
    mockingoose.users.toReturn(_user, 'findOne');

    User.findOne({ email: 'test@example.com' }).then((user) => {
      expect(user.name).toEqual(_user.name);
      expect(user.email).toEqual(_user.email);
      expect(user.password).toEqual(_user.password);
    });
  });

  it('should return new user with save', () => {
    const newUser = new User(_user);

    mockingoose.users.toReturn(_user, 'save');

    newUser.save().then((user) => {
      expect(user.name).toEqual(_user.name);
      expect(user.email).toEqual(_user.email);
      expect(user.password).toEqual(_user.password);
    });
  });
});

describe('Test controllers', () => {
  const req = {
    body: {
      name: 'Test Name',
      email: 'test@example.com',
      password: 'PASSWORD',
    }
  };

  const _user = {
    name: 'Test Name',
    email: 'test@example.com',
    password: 'PASSWORD',
  };

  let res;

  beforeEach(() => {
    mockingoose.resetAll();
    res = {
      json: jest.fn(),
      status: jest.fn(),
    };
  });

  it('Calls registerUser with existed email', () => {
    mockingoose.users.toReturn(_user, 'findOne');
    mockingoose.users.toReturn(_user, 'save');
    let statusCode;
    res.status.mockImplementationOnce((code) => {
      statusCode = code;
      return { json: jest.fn(data => data) };
    });
    registerUser(req, res).then((data) => {
      expect(statusCode).toEqual(400);
      expect(data[0]).toEqual('Email already exists');
    });
  });

  it('Calls registerUser without name', () => {
    const invalidReq = {
      body: {
        name: '',
        email: 'test@example.com',
        password: 'PASSWORD',
      }
    };
    mockingoose.users.toReturn(_user, 'findOne');
    mockingoose.users.toReturn(_user, 'save');
    let statusCode;
    res.status.mockImplementationOnce((code) => {
      statusCode = code;
      return { json: jest.fn(data => data) };
    });
    registerUser(invalidReq, res).then((data) => {
      expect(statusCode).toEqual(400);
      expect(data[0]).toEqual('Name field is required');
    });
  });

  it('Calls registerUser with short password', () => {
    const invalidReq = {
      body: {
        name: 'Test Name',
        email: 'test@example.com',
        password: 'PASS',
      }
    };
    mockingoose.users.toReturn(_user, 'findOne');
    mockingoose.users.toReturn(_user, 'save');
    let statusCode;
    res.status.mockImplementationOnce((code) => {
      statusCode = code;
      return { json: jest.fn(data => data) };
    });
    registerUser(invalidReq, res).then((data) => {
      expect(statusCode).toEqual(400);
      expect(data[0]).toEqual('Password must be at least 6 characters');
    });
  });

  it('Calls loginUser with invalid email', () => {
    const invalidReq = {
      body: {
        email: 'test@example',
        password: 'PASSWORD',
      }
    };
    mockingoose.users.toReturn(_user, 'findOne');
    let statusCode;
    res.status.mockImplementationOnce((code) => {
      statusCode = code;
      return { json: jest.fn(data => data) };
    });
    loginUser(invalidReq, res).then((data) => {
      expect(statusCode).toEqual(400);
      expect(data[0]).toEqual('Email is invalid');
    });
  });

  it('Calls loginUser with invalid password', () => {
    const invalidReq = {
      body: {
        email: 'test@example.com',
        password: 'random',
      }
    };
    mockingoose.users.toReturn(_user, 'findOne');
    let statusCode;
    res.status.mockImplementationOnce((code) => {
      statusCode = code;
      return { json: jest.fn(data => data) };
    });
    loginUser(invalidReq, res).then((data) => {
      expect(statusCode).toEqual(400);
      expect(data[0]).toEqual('Password incorrect');
    });
  });

  it('Calls getUserInfo without token', () => {
    const invalidReq = {
      headers: {},
      body: {
        email: 'test@example.com',
        password: 'random',
      }
    };
    mockingoose.users.toReturn(_user, 'findOne');
    let statusCode;
    res.status.mockImplementationOnce((code) => {
      statusCode = code;
      return { json: jest.fn(data => data) };
    });
    getUserInfo(invalidReq, res).then((data) => {
      expect(statusCode).toEqual(401);
      expect(data[0]).toEqual('No token provided');
    });
  });
});
