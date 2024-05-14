const express = require('express');
const authorizeMiddleware = require('./authorize.js');
const app = express.Router();
const User = require("../items/user.js");
const Profile = require("../items/profiles.js");
app.get("/v1/GetSkin", authorizeMiddleware, async (req, res) => {
    const { username } = req.query;
    if (!username)
        return res.status(400).send('No username provided.');
        try {
          const user = await User.findOne({ username: username });
      const skin = user ? await Profile.findOne({ username: user.username }) : null;
      const favouriteCharacter = skin?.profiles?.athena?.stats?.attributes?.favorite_character;
            if (user) 
            {
              if (favouriteCharacter == null) 
              {
                res.send("CID_001_Athena_Commando_F_Default");  
              } else 
              {
              res.send(favouriteCharacter);  
              }
              
            } else {
              res.send("User not found.");
            }
          } catch (er) {
            console.log("Error: " + er)
            res.send("Error");
          }
      });

module.exports = app; // Export the model using CommonJS syntax