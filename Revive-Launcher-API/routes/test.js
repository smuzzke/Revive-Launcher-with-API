const express = require('express');
const authorizeMiddleware = require('./authorize.js');
const app = express.Router();

app.get("/v1/Test", authorizeMiddleware, (req, res) => {
    res.send("Success");
  });  

module.exports = app; // Export the model using CommonJS syntax