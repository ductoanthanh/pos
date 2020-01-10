const express = require('express');
const router = express.Router();

const OrderCtl = require('../controllers/order');

router.post('', OrderCtl.createOrder);

module.exports = router;