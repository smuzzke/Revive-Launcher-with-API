import express from 'express';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';
import authorizeMiddleware from './authorize.js';
import fs from 'fs/promises';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define the path to your JSON file
const configFilePath = path.join(__dirname, 'config.json');

// Define a function to load the JSON file
const loadConfig = async () => {
    try {
        const jsonData = await fs.readFile(configFilePath, 'utf-8');
        return JSON.parse(jsonData);
    } catch (er) {
        console.log("Error reading JSON file: " + er);
        return null;
    }
};

// Define the route handlers
app.get("/v1/BEClient", authorizeMiddleware, async (req, res) => {
    const configData = await loadConfig();
    res.send(configData ? configData.BE_EXEURL : "Error");
});

app.get("/v1/LauncherClient", authorizeMiddleware, async (req, res) => {
    const configData = await loadConfig();
    res.send(configData ? configData.Launcher_EXEURL : "Error");
});

app.get("/v1/Redirect", authorizeMiddleware, async (req, res) => {
    const configData = await loadConfig();
    res.send(configData ? configData.RedirectURL : "Error");
});

app.get("/v1/AnticheatZip", authorizeMiddleware, async (req, res) => {
    const configData = await loadConfig();
    res.send(configData ? configData.AntiCheatZipURL : "Error");
});

app.get("/v1/Splashscreen", authorizeMiddleware, async (req, res) => {
    const configData = await loadConfig();
    res.send(configData ? configData.ReviveSplashScreenURL : "Error");
});

app.get("/v1/AnticheatConfig", authorizeMiddleware, async (req, res) => {
    const configData = await loadConfig();
    res.send(configData ? configData.ReviveSettingsJsonURL : "Error");
});

export default app;
