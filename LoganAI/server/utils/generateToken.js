const jwt = require('jsonwebtoken');

/**
 * Generates a signed JWT for a given user ID.
 * @param {string} id - MongoDB ObjectId of the user
 * @returns {string} signed JWT token
 */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

module.exports = generateToken;
