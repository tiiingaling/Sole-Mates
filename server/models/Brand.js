const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const brandSchema = new Schema({
  name: {
    type: String,
    required: 'The Brand name is required',
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  products: [{
    type: Schema.Types.ObjectId,
    ref: 'Product',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  }
});

const Brand = model('Brand', brandSchema);

module.exports = Brand;