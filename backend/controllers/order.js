const Order = require("../models/order");
const Food = require("../models/food");
const { normalizeErrors } = require("../helpers/mongoose");
const moment = require("moment");

exports.createOrder = (req, res) => {
  const { title, totalPrice, guests, foods } = req.body;

  const order = new Order({ title, totalPrice, guests, foods });

  Order.create(order, (err, newOrder) => {
    if (err) {
      return res.status(422).send({ errors: normalizeErrors(err.errors) });
    }

    foods.forEach(food => {
      Food.findById(food._id)
        .populate("orders")
        .exec((err, foundFood) => {
          if (err) {
            return res
              .status(422)
              .send({ errors: normalizeErrors(err.errors) });
          }

          foundFood.orders.push(newOrder._id);
          foundFood.save();
        });
    });

    return res.json(newOrder);
  });
};

exports.markOrderDone = (req, res) => {
  const orderID = req.params.id;

  Order.findById(orderID).exec((err, doc) => {
    if (err) {
      return res.status(422).send({ errors: normalizeErrors(err.errors) });
    }

    doc.isDone = true;
    doc.save();

    return res.json(doc);
  });
};

exports.getOrders = (req, res) => {
  const { location } = req.query;
  const queryParam = {
    kitchen: { isDone: false },
    counter: { isPaid: false }
  };

  Order.find(queryParam[location])
    .populate("foods.itemInfo")
    .populate("foods.variant")
    .then(docs => {
      res.json(docs);
    });
};
