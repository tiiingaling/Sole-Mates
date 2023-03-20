const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const productSchema = new Schema({
  title: {
    type: String,
    required: 'The Product title is required',
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  categories: [{
    type: Schema.Types.ObjectId,
    ref: 'Category',
  }],
  brand: {
    type: Schema.Types.ObjectId,
    ref: 'Brand',
    required: false
},
  image: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  }
});

const Product = model('Product', productSchema);

module.exports = Product;