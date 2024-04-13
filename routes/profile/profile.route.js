const express = require("express");
const { checkLoggedIn, httpProfile } = require("./profile.controller");
const profileRoute = express.Router();

profileRoute.get("/", checkLoggedIn, httpProfile);

module.exports = { profileRoute };
