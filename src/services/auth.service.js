const crypto = require('crypto');

let users = [
    {
        id: 1,
        username: 'admin',
        password: 'admin',
        role: 'admin'
    },
    {
        id: 2,
        username: 'user1',
        password: 'user1',
        role: 'user1'
    },
    {
        id: 3,
        username: 'user2',
        password: 'user2',
        role: 'user2'
    },
];

let tokens = [
    {
        id: 1,
        username: 'admin',
        token: 'admin',
    },
    {
        id: 2,
        username: 'user1',
        token: 'user1',
    },
    {
        id: 3,
        username: 'user2',
        token: 'user2',

    },
    {
        id: 4,
        username: 'admin',
        token: 'admin',
    }
];

function userExist(username) {
    return users.some(user => user.username === username);
}

function registerUser(username, password, role) {
    const user = {
        id: users.length + 1,
        username,
        password,
        role
    };
    users.push(user);
    return user;
}

function loginUser(username, password) {
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        return true;
    }

    return false;
}

function refreshTokenExist(tokenToCheck) {
    const tokenExist = tokens.find(token => token.token === tokenToCheck);
    if (tokenExist) {
        return tokenExist.username;
    }

    return false;
}

async function generateHash() {
    const random1 = Math.random().toString(36).substring(2, 15);
    const random2 = Math.random().toString(36).substring(2, 15);
    const finalRandom = random1 + random2;

    const encoder = new TextEncoder();
    const data = encoder.encode(finalRandom);
    const hash = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hash));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

async function createRefreshToken(username) {
    let token = username + '.' + await generateHash();

    const newToken = {
        id: tokens.length + 1,
        username,
        token: token,
    };

    tokens.push(newToken);

    return token;
}

function revokeRefreshToken(tokenRemove) {
    const index = tokens.findIndex(token => token.token === tokenRemove);
    if (index !== -1) {
        tokens.splice(index, 1);
        return true;
    }

    return false;
}

module.exports = {
    userExist,
    registerUser,
    loginUser,
    refreshTokenExist,
    createRefreshToken,
    revokeRefreshToken
};