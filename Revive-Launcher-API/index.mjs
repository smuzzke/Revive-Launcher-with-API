import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import fs from 'fs';
import path from 'path';
import { dirname } from 'dirname-filename-esm';
import {writeFileSync} from 'fs';
import crypto from 'crypto';
import authorizeMiddleware from './routes/authorize.js'
import User from './items/user.js'
import Profile from './items/profiles.js'
import cron from "node-cron";
import { config as dotenvConfig } from "dotenv";

const __dirname = dirname(import.meta);
const Version = "1.0.0";
export const GetAcessToken = "31811a3e1afdb125efa4151438f29928a5dcf6b403c13f0a2dde440bca545654"; // should be changed every update.
const port = 3001;
const ClientKey = generateRandomKey();

dotenvConfig();
function generateRandomKey() 
{
  return crypto.randomBytes(32).toString("hex");
}

const envContents = `
VERSION=${Version}
PORT=${port}
MONGODB_URI=${process.env.MONGODB_URI}
CLIENT_KEY=${ClientKey}
ACCESS_TOKEN_SECRET=${GetAcessToken}
`;
await writeFileSync(".env", envContents);
console.log("Keys updated in .env file.");
const app = express();

// Middleware
app.use(express.json());
app.use(cors()); // Enable CORS

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB: ", error);
  });

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).send("Something went wrong.");
});


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

for (const fileName of fs.readdirSync(path.join(__dirname, "routes"))) {
  try {
      app.use((await import(`file://${__dirname}/routes/${fileName}`)).default);
  }
  catch (error) {
      console.log(fileName, error);
  }
}

export default app;