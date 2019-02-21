const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateRegisterInput(data) {
  const errors = [];

  // Convert empty fields to an empty string so we can use validator functions
  const name = !isEmpty(data.name) ? data.name : '';
  const email = !isEmpty(data.email) ? data.email : '';
  const password = !isEmpty(data.password) ? data.password : '';

  // Name checks
  if (Validator.isEmpty(name)) {
    errors.push('Name field is required');
  }

  // Email checks
  if (Validator.isEmpty(email)) {
    errors.push('Email field is required');
  } else if (!Validator.isEmail(email)) {
    errors.push('Email is invalid');
  }

  // Password checks
  if (Validator.isEmpty(password)) {
    errors.push('Password field is required');
  }

  if (!Validator.isLength(password, { min: 6, max: 30 })) {
    errors.push('Password must be at least 6 characters');
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
