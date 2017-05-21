// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var memberSchema = new Schema({
  memberId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true
  },
  idcard: {
    type: String,
    required: true
  },
  email: {
    type: String,
  },
  description: {
    type: String,
  }
}, {
  timestamps: true
});

// the schema is useless so far
// we need to create a model using it
var Members = mongoose.model('Member', memberSchema);

// make this available to our Node applications
module.exports = Members;