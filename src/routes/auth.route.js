const express = require("express");

const authRouter = express.Router();

const authController = require("../controllers/auth.controller.js");

const authMiddleware = require("../middlewares/auth.middleware.js");

authRouter.post("/login", authController.login);
authRouter.post("/register", authController.register);
authRouter.post("/logout", authController.logout);
authRouter.post("/access", authController.access);
authRouter.post("/refresh", authController.refresh);

authRouter.get("/test", authMiddleware.authorize, authController.test);
authRouter.get(
    "/testAdmin",
    authMiddleware.authorize,
    authController.testAdmin
);

module.exports = authRouter;
