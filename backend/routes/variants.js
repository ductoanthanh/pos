const express = require("express");
const router = express.Router();

const VariantCtl = require("../controllers/variant");

router.post("", VariantCtl.createVariant);

module.exports = router;
