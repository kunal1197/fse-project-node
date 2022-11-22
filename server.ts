/**
 * @file Implements an Express Node HTTP server.
 */
import express from 'express';
import SpotifyController from "./src/controllers/SpotifyController";

const cors = require('cors')
const app = express();
app.use(cors());
app.use(express.json());

SpotifyController.getInstance(app);


/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on Heroku if available.
 */
const PORT = 4000;
app.listen(process.env.PORT || PORT);
