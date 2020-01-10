const express = require('express');
const router = express.Router();

const FoodCtl = require('../controllers/food');

router.post('', FoodCtl.createFoodItem);

module.exports = router;