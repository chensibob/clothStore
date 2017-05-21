// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Will add the Currency type to the Mongoose Schema types
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

// create a schema
var spotItemSchema = new Schema({
  // good: goodSchema,
  goodId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true
  },
  size: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  material: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  sellingPrice: {
    type: Currency,
    required: true
  },
  manufactureDate: {
    type: Date,
    required: true
  },
  manufacturer: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// the schema is useless so far
// we need to create a model using it
var SpotItems = mongoose.model('SpotItem', spotItemSchema);

// make this available to our Node applications
module.exports = SpotItems;