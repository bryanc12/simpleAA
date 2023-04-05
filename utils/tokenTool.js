var jwt = require('jsonwebtoken');

secret = 'secret123'

function generateToken(username, role) {
    const payload = {
        username: username,
        role: role
    };
    return jwt.sign(payload, secret, { expiresIn: '1h' });
}

function verifyToken(token) {
    return jwt.verify(token, secret);
}

module.exports = {
    generateToken,
    verifyToken
};