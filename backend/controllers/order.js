const Order = require('../models/order');
const Food = require('../models/food');
const { normalizeErrors } = require('../helpers/mongoose');
const moment = require('moment');

exports.createOrder = (req, res) => {
  const { totalPrice, guests, foods } = req.body;

  const order = new Order({ totalPrice, guests, foods });

	foods.forEach(food => {
		Food.findById(food._id)
      .populate('orders')
      .exec((err, foundFood) => {

				if (err) {
					return res.status(422).send({errors: normalizeErrors(err.errors)});
				}

				order.foods.push(foundFood);
				foundFood.orders.push(order);
				foundFood.save();
  		})
	});

	order.save((err) => {
		if (err) {
			return res.status(422).send({errors: normalizeErrors(err.errors)});
		}

		return res.json({"done": true});
	});
}