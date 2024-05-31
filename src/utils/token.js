const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../utils/secrets');
const { logger } = require('./logger');

const tokenExpiresIn = 3600 * 24 * 1; // 1 day.

const generateToken = (id) => {
  return jwt.sign({
    id,
    exp: Math.floor(Date.now() / 1000) + tokenExpiresIn,
  }, JWT_SECRET_KEY);
}

const decode = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET_KEY)
    } catch (error) {
        logger.error(error);
    }
};

// Token validation helper
const isValidToken = (token) => {
    try {
      const decoded = jwt.verify(token, JWT_SECRET_KEY);
      return !!decoded; // Convert truthy/falsy to boolean
    } catch (error) {
      return false;
    }
  };

module.exports = {
    generateToken,
    isValidToken,
    decode
}