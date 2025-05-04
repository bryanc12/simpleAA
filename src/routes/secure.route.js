const express = require("express");

const secureRouter = express.Router();

const secureController = require("../controllers/secure.controller.js");

secureRouter.post("/csrf", secureController.csrf);

module.exports = secureRouter;
