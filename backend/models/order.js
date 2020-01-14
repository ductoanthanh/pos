const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  title: String,
  totalPrice: Number,
  guests: Number,
  createdAt: { type: Date, default: Date.now },
  foods: [
    {
      itemInfo: { type: Schema.Types.ObjectId, ref: "Food" },
      //variant: { type: Schema.Types.ObjectId, ref: "Variant" },
      quantity: Number,
      additionalInfo: String
    }
  ],
  isDone: { type: Boolean, default: false },
  isPaid: { type: Boolean, default: false }
});

module.exports = mongoose.model("Order", orderSchema);
