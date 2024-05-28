const router = require('express').Router();
const { asyncHandler } = require('../middlewares/asyncHandler');
const checkEmail = require('../middlewares/checkEmail');
const { signup: signupValidator, signin: signinValidator, confirmRegister } = require('../validators/auth');
const authController = require('../controllers/auth.controller');


router.route('/signup')
    .post(signupValidator, asyncHandler(checkEmail), asyncHandler(authController.signup));

router.route('/login')
    .post(signinValidator, asyncHandler(authController.signin));

router.route('/me')
    .get(asyncHandler(authController.getCurrentUser));

router.route('/validateToken')
    .get(asyncHandler(authController.validateToken));

router.route('/confirm/register')
    .post(confirmRegister, asyncHandler(authController.confirmRegistration));

module.exports = router;