// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Will add the Currency type to the Mongoose Schema types
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

// create a schema
var cashNoteSchema = new Schema({
  // good: goodSchema,
  cash: {
    type: Currency,
    required: true
  },
  change: {
    type: Currency,
    required: true
  },
  income: {
    type: Currency,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
}, {
  timestamps: true
});

// the schema is useless so far
// we need to create a model using it
var CashNotes = mongoose.model('CashNote', cashNoteSchema);

// make this available to our Node applications
module.exports = CashNotes;