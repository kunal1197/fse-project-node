/**
 * @file Implements an Express Node HTTP server.
 */
import express from "express";
import SpotifyController from "./src/controllers/SpotifyController";
import LikeController from "./src/controllers/LikeController";
import mongoose from "mongoose";
import UserController from "./src/controllers/UserController";
import { CommentController } from "./src/controllers/CommentController";
import AuthenticationController from "./src/controllers/AuthenticationController";

require("dotenv").config({ debug: true });

const cors = require("cors");
const session = require("express-session");
const app = express();
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: false,
  maxPoolSize: 20,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  family: 4,
};

// const CONNECTION_STRING =
//   process.env.DB_CONNECTION_STRING ||
//   "mongodb+srv://kunal:fse123456@cluster0.wuwbxi4.mongodb.net/tuiter-fse-project?retryWrites=true&w=majority" ||
//   "mongodb://localhost:27017/tuiter-fse-project";
// mongoose.connect(CONNECTION_STRING).then(() => {
//   console.log("Connected to MongoDB", CONNECTION_STRING);
// });
let sess = {
  secret: "Secret",
  cookie: {
    secure: false,
  },
};
const DB_NAME = process.env.DB_NAME;
let connectionString;
if (process.env.ENVIRONMENT === "local") {
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
mongoose.connect(connectionString, options);

app.use(cors({ credentials: true, origin: true }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session(sess));
SpotifyController.getInstance(app);
LikeController.getInstance(app);
UserController.getInstance(app);
CommentController.getInstance(app);
AuthenticationController.getInstance(app);

/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on Heroku if available.
 */
const PORT = 4000;
app.listen(process.env.PORT || PORT);

module.exports = app;
