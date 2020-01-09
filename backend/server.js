const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
require('dotenv').config();

const db = require("monk")(process.env.DB_URL);

const collection_foodItems = db.get("FoodItems"); // collection on MongoDB

const app = express();

// our server instance
const server = http.createServer(app);

const port = process.env.PORT || 3001;

server.listen(port, () => console.log(`Listening on port ${port}`));
