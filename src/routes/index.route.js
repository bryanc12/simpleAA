const express = require('express');
const router = express.Router();

const authRouter = require('./auth.route.js');
const secureRouter = require('./secure.route.js');

const routes = [
    {
        path: '/auth',
        route: authRouter
    },
    {
        path: '/secure',
        route: secureRouter
    }
];

routes.forEach(route => {
    router.use(route.path, route.route);
});

module.exports = router;