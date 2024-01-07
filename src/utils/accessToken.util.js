const jwt = require('jsonwebtoken');
const jwtConfig = require('../configs/jwt.config.js');

function generateAccessToken(username, lifetime) {
    if (lifetime === undefined) {
        lifetime = "1h";
    };

    const payload = {
        username: username,
    };

    return jwt.sign(payload, jwtConfig.jwtSecret, { expiresIn: lifetime });
}

function verifyAccessToken(token) {
    let verify = false;

    try {
        verify = jwt.verify(token, jwtConfig.jwtSecret);
    } catch (err) {
        return verify;
    }

    return verify;
}

module.exports = {
    generateAccessToken,
    verifyAccessToken,
};
