const express = require('express');
const app = express.Router();
const authorizeMiddleware = require('./authorize.js');
const ClientKey = process.env.CLIENT_KEY;
app.get("/v1/GetDownloadLinks", authorizeMiddleware, async (req, res) => {
    const { Key } = req.query;
        if (!Key)
        return res.status(400).send('No Key provided.');
        try {
            if (Key == ClientKey) 
            {
              res.send("Test", "Test2", "Test3");
            } else {
              res.send("key not found.");
            }
          } catch (er) {
            console.log("Error: " + er)
            res.send("Error");
          }
      });

module.exports = app; // Export the model using CommonJS syntax