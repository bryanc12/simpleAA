const jwt = require("jsonwebtoken");
const jwtConfig = require("../configs/jwt.config.js");

function generateCsrfToken(username, path, lifetime) {
    if (lifetime === undefined) {
        lifetime = 1000 * 60 * 30;
    }

    const payload = {
        username: username,
        path: path,
    };

    return jwt.sign(payload, jwtConfig.jwtSecret, { expiresIn: lifetime });
}

function verifyCsrfToken(token) {
    let verify = false;

    try {
        verify = jwt.verify(token, jwtConfig.jwtSecret);
    } catch (err) {
        return verify;
    }

    return verify;
}

module.exports = {
    generateCsrfToken,
    verifyCsrfToken,
};
