const express = require('express');
const authorizeMiddleware = require('./authorize.js');
const app = express.Router();
const Backendurl = "http://34.154.97.248:3551/Test"

async function GetBackendStatusAPI() {
    try {
      const authorizationToken = 'computer-agent';
  
      const response = await fetch(Backendurl, {
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

app.get("/v1/BackendStatus", authorizeMiddleware, async (req, res) => {
    try 
    {
      const apiResponse = await GetBackendStatusAPI();
      res.send(apiResponse);
    } catch (error) {
      console.log(error);
      console.error('Error while getting data from API:', error);
      res.status(500).send("Error");
    }
  });
  module.exports = app; // Export the model using CommonJS syntax