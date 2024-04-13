function checkLoggedIn(req, res, next) {
  const isLogged = req.isAuthenticated() && req.user;
  if (!isLogged) {
    return res.status(401).json({ error: "please login " });
  }
  next();
}

function httpProfile(req, res) {
  return res.send("this is sercert data");
}

module.exports = { checkLoggedIn, httpProfile };
