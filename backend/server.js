const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
let cors = require("cors");

const foodRoutes = require("./routes/foods");
const orderRoutes = require("./routes/orders");
const variantRoutes = require("./routes/variants");
require("dotenv").config();

const keys = require("./keys");

const db = require("monk")(keys.DB_URL);

const app = express();
app.use(bodyParser.json());
app.use(cors());

// our server instance
const server = http.createServer(app);

// connect database for endpoints
mongoose
  .connect(keys.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then((db, err) => {
    if (db) {
      console.log("connected");
    }
  });

app.use("/api/v1/foods", foodRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/variants", variantRoutes);

app.get("/api/", (req, res, next) => {
  res.send("Hi from api backend");
});

const port = process.env.PORT || 5000;

server.listen(port, () => console.log(`Listening on port ${port}`));
