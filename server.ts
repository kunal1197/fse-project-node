/**
 * @file Implements an Express Node HTTP server.
 */
import express from 'express';
import SpotifyController from "./src/controllers/SpotifyController";
import LikeController from "./src/controllers/LikeController";
import mongoose from "mongoose";
import UserController from "./src/controllers/UserController";

require('dotenv').config({debug: true});

const cors = require('cors')
const app = express();

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: false,
    maxPoolSize: 20,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4
}

const DB_NAME = process.env.DB_NAME;
let connectionString;
if (process.env.ENVIRONMENT === 'local') {
    const PROTOCOL = "mongodb";
    const HOST = process.env.DB_HOST;
    connectionString = `${PROTOCOL}://${HOST}/${DB_NAME}`;
} else {
    const PROTOCOL = "mongodb+srv";
    const DB_USERNAME = process.env.DB_USERNAME;
    const DB_PASSWORD = process.env.DB_PASSWORD;
    const HOST = process.env.DB_HOST;
    const DB_QUERY = "retryWrites=true&w=majority";
    connectionString = `${PROTOCOL}://${DB_USERNAME}:${DB_PASSWORD}@${HOST}/${DB_NAME}?${DB_QUERY}`;
}
// connect to the database
console.log(connectionString)
mongoose.connect(connectionString, options);


app.use(cors());
app.use(express.urlencoded({extended: false}))
app.use(express.json());

SpotifyController.getInstance(app);
LikeController.getInstance(app);
UserController.getInstance(app);


/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on Heroku if available.
 */
const PORT = 4000;
app.listen(process.env.PORT || PORT);
