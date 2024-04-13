const express = require("express");

const failureRouter = express.Router();

failureRouter.get("/", (req, res) => {
  return res.send("opps ....");
});

module.exports = { failureRouter };
