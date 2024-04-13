const path = require("path");
const express = require("express");

const homeRouter = express.Router();

homeRouter.get("/", (req, res) => {
  return res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = { homeRouter };
