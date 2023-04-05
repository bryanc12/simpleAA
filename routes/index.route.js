const express = require('express');
const router = express.Router();

const authRouter = require('./auth.route.js');

const routes = [
    {
        path: '/auth',
        route: authRouter
    }
];

routes.forEach(route => {
    router.use(route.path, route.route);
});

module.exports = router;