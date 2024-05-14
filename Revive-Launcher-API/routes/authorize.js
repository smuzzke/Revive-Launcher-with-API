require("dotenv").config();
const GetAcessToken = process.env.ACCESS_TOKEN_SECRET;

const authorizeMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
  
    if (!authHeader) {
      res.status(401);
      return res.send("No authorization token provided.");
    }
  
    const tokenParts = authHeader.split(" ");
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
      res.status(401);
      return res.send("Invalid authorization token");
    }
  
    const token = tokenParts[1];
  
    if (GetAcessToken === token) {
      next();
    } else {
      res.status(401);
      console.log(GetAcessToken);
      return res.send("Invalid authorization token");
    }
  };
  
  module.exports = authorizeMiddleware; // Export the model using CommonJS syntax
  