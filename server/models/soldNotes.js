// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Will add the Currency type to the Mongoose Schema types
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

// create a schema
var soldNoteSchema = new Schema({
  // good: goodSchema,
  goodId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  discount: {
    type: Currency,
    required: true
  },
  soldPrice: {
    type: Currency,
    required: true
  },
  soldDate: {
    type: Date,
    required: true
  }
}, {
  timestamps: true
});

// the schema is useless so far
// we need to create a model using it
var SoldNotes = mongoose.model('SoldNote', soldNoteSchema);

// make this available to our Node applications
module.exports = SoldNotes;