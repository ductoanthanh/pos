let express = require("express");
let path = require("path");
let app = express();
let server = require("http").Server(app);
const socketIO = require("socket.io");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const Order = require("./models/order");
const Food = require("./models/food");
const Variant = require("./models/variant");

// Use the environment port if available, or default to 3000
let port = process.env.PORT || 3000;

// Serve static files from /public
app.use(express.static(path.join(__dirname, "/build")));

// Handles any requests that don't match the ones above
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/build/index.html"));
});

const io = socketIO(server); // instances of io

io.on("connection", socket => {
  console.log("New client connected" + socket.id);

  // Returning the initial data of orders from Orders collection
  socket.on("get_orders", () => {
    Order.find({ isDone: false })
      .populate("foods.itemInfo")
      .populate("foods.variant")
      .then(docs => {
        io.emit("get_order_data", docs);
      });
  });

  // Returning the initial data of orders from Orders collection
  socket.on("get_foods", () => {
    Food.find()
      .populate("variants")
      .then(docs => {
        io.emit("get_food_data", docs);
      });
  });

  // Returning the initial data of orders from Orders collection
  socket.on("add_order", request => {
    const { title, totalPrice, guests, foods } = request;

    const order = new Order({ title, totalPrice, guests, foods });

    Order.create(order, (err, newOrder) => {
      if (err) {
        console.log(err);
      }

      foods.forEach(food => {
        Food.findById(food.itemInfo)
          .populate("orders")
          .exec((err, foundFood) => {
            if (err) {
              console.log(err);
            }
            foundFood.orders.push(newOrder._id);
            foundFood.save();
          });
      });
      io.emit("change_data");
    });
  });

  // Order completion
  socket.on("mark_order_done", id => {
    Order.update({ _id: id }, { $set: { isDone: true } }).then(updatedDoc => {
      // Updating the different Kitchen area with the current Status.
      io.emit("change_order_data");
    });
  });

  // disconnect is fired when a client leaves the server
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

// connect database for endpoints
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then((db, err) => {
    if (err) console.log(err);
    console.log("db connected");
  });

// Start the server
server.listen(port, () => console.log(`Server started on port ${port}`));

process.on("SIGTERM", function() {
  console.log("Received SIGTERM, shutting down server");
  server.close();
  process.exit(0);
});
