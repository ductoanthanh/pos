const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const foodSchema = new Schema({
  name: { type: String, max: [128, 'Too long, max is 128 characters']},
  category: { type: String, lowercase: true },
  price: Number,
  description: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Food', foodSchema);