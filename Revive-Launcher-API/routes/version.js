const express = require('express');
const authorizeMiddleware = require('./authorize.js');
const app = express.Router();
const Version = process.env.VERSION;
app.get("/v1/Version", authorizeMiddleware, async (req, res) => {
    res.send(Version);
});
module.exports = app; // Export the model using CommonJS syntax