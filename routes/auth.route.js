const express = require('express');

const authRouter = express.Router();

const authController = require('../controllers/auth.controller.js');

authRouter.post('/login', authController.login);
authRouter.post('/register', authController.register);
authRouter.post('/logout', authController.logout);
authRouter.post('/access', authController.access);

module.exports = authRouter;