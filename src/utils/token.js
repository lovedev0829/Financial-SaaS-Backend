const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../utils/secrets');
const { logger } = require('./logger');

const generateToken = (id) => jwt.sign({ id }, JWT_SECRET_KEY, { expiresIn: '1d'});

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