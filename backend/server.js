const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const foodRoutes = require('./routes/foods');
const orderRoutes = require('./routes/orders');
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

  // Placing the order
  socket.on("putOrder", order => {
    collection_foodItems
      .update({ _id: order._id }, { $inc: { ordQty: order.order } })
      .then(updatedDoc => {
        // Emitting event to update the Kitchen opened across the devices with the realtime order values
        io.sockets.emit("change_data");
      });
  });

  // Order completion
  socket.on("mark_done", id => {
    collection_foodItems
      .update({ _id: id }, { $inc: { ordQty: -1, prodQty: 1 } })
      .then(updatedDoc => {
        // Updating the different Kitchen area with the current Status.
        io.sockets.emit("change_data");
      });
  });

  // Functionality to change the predicted quantity value
  socket.on("ChangePred", predicted_data => {
    collection_foodItems
      .update(
        { _id: predicted_data._id },
        { $set: { predQty: predicted_data.predQty } }
      )
      .then(updatedDoc => {
        // Socket event to update the Predicted quantity across the Kitchen
        io.sockets.emit("change_data");
      });
  });

  // disconnect is fired when a client leaves the server
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

// connect database for endpoints
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then((db, err) => {
  if (db) {
    console.log('connected');
  }
});

app.use('/api/v1/foods', foodRoutes);
app.use('/api/v1/orders', orderRoutes);

const port = process.env.PORT || 3001;

server.listen(port, () => console.log(`Listening on port ${port}`));
