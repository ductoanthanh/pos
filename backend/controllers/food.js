const Food = require('../models/food');
const { normalizeErrors } = require('../helpers/mongoose');

exports.createFoodItem = (req, res) => {
	const { name, category, description, price } = req.body;

	const food = new Food({name, category, description, price});

	Food.create(food, (err, newFood) => {
		if (err) {
			return res.status(422).send({errors: normalizeErrors(err.errors)});
		}

		return res.json(newFood);
	});

}