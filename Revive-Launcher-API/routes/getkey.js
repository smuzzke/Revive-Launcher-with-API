const express = require('express');
const authorizeMiddleware = require('./authorize.js');
const app = express.Router();
const ClientKey = process.env.CLIENT_KEY;
app.get("/v1/GetKey", authorizeMiddleware, async (req, res) => {
    try {
          res.send(ClientKey);
        }
       catch (er) {
        console.log("Error: " + er)
        res.send("Error");
      }
  });
  module.exports = app; // Export the model using CommonJS syntax