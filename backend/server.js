const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const bodyParser = require('body-parser');
require('dotenv').config();

const db = require("monk")(process.env.DB_URL);

const collection_foodItems = db.get("FoodItems"); // collection on MongoDB

const app = express();
app.use(bodyParser.json())

// our server instance
const server = http.createServer(app);

// This creates our socket using the instance of the server
const io = socketIO(server);

io.on("connection", socket => {
  console.log("New client connected" + socket.id);

  // Returning the initial data of food menu from FoodItems collection
  socket.on("initial_data", () => {
    collection_foodItems.find({}).then(docs => {
      io.sockets.emit("get_data", docs);
    });
  });

  // disconnect is fired when a client leaves the server
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

const port = process.env.PORT || 3001;

server.listen(port, () => console.log(`Listening on port ${port}`));
