const fs = require("fs");
const https = require("https");
const express = require("express");
const helmet = require("helmet");
const passport = require("passport");
const cookieSession = require("cookie-session");
const { loginRouter } = require("./routes/googleLoginOauth/login.route");
const { logoutRouter } = require("./routes/logout.route");
const { homeRouter } = require("./routes/home.route");
const { failureRouter } = require("./routes/failer.route");
const { profileRoute } = require("./routes/profile/profile.route");
require("dotenv").config();

const { config } = require("./config/config");

const app = express();

// save session to the cookie
passport.serializeUser((user, done) => {
  done(null, user.id);
});
// read session from the cookie
passport.deserializeUser((id, done) => {
  done(null, id);
});

app.use(helmet());

app.use(
  cookieSession({
    name: "session",
    maxAge: 24 * 60 * 60 * 1000,
    keys: [config.COOKIE_KEY_1, config.COOKIE_KEY_2], // initial key and rotaion key
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
});

app.use("/auth/google", loginRouter);
app.use("/auth/logout", logoutRouter);
app.use("/", homeRouter);
app.use("/failure", failureRouter);
app.use("/profile", profileRoute);
//NOTE - server listening
https
  .createServer(
    {
      key: fs.readFileSync("key.pem"),
      cert: fs.readFileSync("cert.pem"),
    },
    app
  )
  .listen(config.PORT, () => {
    console.log(`server is listen on port ${config.PORT}`);
  });
