const jwt = require("jsonwebtoken");
const config = require('../config');
const Admin = require('../models/Admin');

const tokenExpiresIn = 3600 * 24 * 7; // 7 days.

const generateToken = (admin) => {
  return jwt.sign({
    username: admin.username,
    exp: Math.floor(Date.now() / 1000) + tokenExpiresIn,
  }, config.securityKey);
}

const validateToken = (token) => {
  try {
    const decoded = jwt.verify(token, config.securityKey);
    return Admin.findOne({ username: decoded.username });
  } catch (err) {
    console.log('[Token] error: ', err.message);
    return false;
  }
}

const adminMiddleware = (req, res, next) => {
  const token = (req.headers.authorization || '').split(' ')[1] || '';

  if (!token) {
    return res.status(401).json({
      status: false,
      message: 'Authentication error!'
    });
  }

  return Promise.resolve()
    .then(() => {
      return validateToken(token);
    })
    .then((admin) => {
      if (!admin) throw new Error('Invalid token! Pls Login again!')
      next();
    })
    .catch((err) => {
      return res.status(401).json({
        status: false,
        message: err.message,
      });
    });
}

// const Authenticate = () => passport.authenticate("jwt", { session: false });

module.exports = {
  generateToken,
  validateToken,
  adminMiddleware,
};
