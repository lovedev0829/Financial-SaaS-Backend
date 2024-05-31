const User = require('../models/user.model');
const { isValidToken, decode: decodeToken } = require('../service/auth');

const authentication =  (req, res, next) => {

    const accessToken = req.headers.authorization?.split(' ')[1]; // Bearer Token
    const decode = decodeToken(accessToken);

    if( accessToken && isValidToken(accessToken)) {
        User.findUserByID(decode?.id, (_, data) => {
            if (data) {
                next();
            } else {
                res.status(401).send({
                    status: "error",
                    message: "Authoriaztion error!"
                });
            }
        });    
    } else {
        res.status(400).send({
            status: "error",
            message: "Invalid Token!"
        });
    }
}

module.exports = authentication;