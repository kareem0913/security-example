const { config } = require("../../config/config");

const AUTH_OPTION = {
  callbackURL: "/auth/google/callback",
  clientID: config.CLIENT_ID,
  clientSecret: config.CLIENT_SECRET,
};

function verifyCallBack(accessToken, refeshToken, profile, done) {
  console.log("this is user", profile);
  done(null, profile);
}

module.exports = { AUTH_OPTION, verifyCallBack };
