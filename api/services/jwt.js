const jwt = require('jsonwebtoken');
const config = require('./../config');
const secret = config.secret_jwt;
const expiresIn = (60 * 60);

const JWT = {};

JWT.sign = params => {
    const token = jwt.sign(params, secret, { expiresIn });
    return token;
}

JWT.validate = req => {
    const token = req.headers['authorization'] || req.headers['Authorization'];
    if (token) {
        return JWT.verify(token);
    } else {
        return false;
    }
}

JWT.verify = token => {
    try {
        const decoded = jwt.verify(token, secret);
        return decoded;
    } catch (e) {
        return false
    }
}

module.exports = JWT;