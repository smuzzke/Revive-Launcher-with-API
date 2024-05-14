const express = require('express');
const authorizeMiddleware = require('./authorize.js');
const app = express.Router();

async function GetGSStatusFromAPI() {
    try {
      const authorizationToken = 'computer-agent';
  
      const response = await fetch(GameServerurl, {
        headers: {
          'Authorization': authorizationToken
        }
      });
  
      if (!response.ok) {
        return "Error";
      }
  
      const responseData = await response.text();
      if (responseData.trim() === "Success") {
        return "Success";
      } else {
        return "Error";
      }
  
    } catch {
      return "Error";
    }
  }

app.get("/v1/GameServerStatus", authorizeMiddleware, async (req, res) => {
    try {
      const apiResponse = await GetGSStatusFromAPI();
      res.send(apiResponse);
    } catch (error) {
      console.error('Error while getting data from API:', error);
      res.status(500).send("Error");
    }
  });
  module.exports = app; // Export the model using CommonJS syntax