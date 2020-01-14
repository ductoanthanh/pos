const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  title: String,
  totalPrice: Number,
  guests: Number,
  createdAt: { type: Date, default: Date.now },
  foods: [{ type: Schema.Types.ObjectId, ref: "Food" }],
  isDone: { type: Boolean, default: false },
  paid: { type: Boolean, default: false }
});

module.exports = mongoose.model("Order", orderSchema);
