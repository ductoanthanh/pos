const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const variantSchema = new Schema({
  id: String,
  title: String,
  totalPrice: Number,
  itemID: { type: Schema.Types.ObjectId, ref: "Food" } // refer to Food item
});

module.exports = mongoose.model("Variant", variantSchema);
