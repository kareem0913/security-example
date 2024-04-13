const express = require("express");
const passport = require("passport");
const { Strategy } = require("passport-google-oauth20");
const { AUTH_OPTION, verifyCallBack } = require("./oauthLogin.controller");

const loginRouter = express.Router();
passport.use(new Strategy(AUTH_OPTION, verifyCallBack));

loginRouter.get(
  "/",
  passport.authenticate("google", {
    scope: ["email"],
  })
);

loginRouter.get(
  "/callback",
  passport.authenticate("google", {
    failureRedirect: "/failure",
    successRedirect: "/",
    session: true,
  }),
  (req, res) => {
    console.log("hi kareem");
  }
);

module.exports = { loginRouter };
