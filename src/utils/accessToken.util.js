const jwt = require("jsonwebtoken");
const jwtConfig = require("../configs/jwt.config.js");

function generateAccessToken(username, lifetime) {
    if (lifetime === undefined) {
<<<<<<< HEAD
        lifetime = "1h";
    };
=======
        lifetime = 1000 * 60 * 60;
    }
>>>>>>> 7fbbd34 (csrf verification fix)

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
