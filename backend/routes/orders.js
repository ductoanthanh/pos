const express = require("express");
const router = express.Router();

const OrderCtl = require("../controllers/order");

router.get("/", OrderCtl.getOrders);
router.post("/", OrderCtl.createOrder);
router.patch("/:id", OrderCtl.markOrderDone);

module.exports = router;
