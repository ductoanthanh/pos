  
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  totalPrice: Number,
  guests: Number,
  createdAt: { type: Date, default: Date.now },
  foods: [{ type: Schema.Types.ObjectId, ref: 'Food' }],
  isDone: Boolean,
});

module.exports = mongoose.model('Order', orderSchema);