var mongoose = require('mongoose');
var Schema =mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
  id: Number,
  username: String,
  password: String,
  OauthId: String,
  OauthToken: String,
  name: {
    type: String,
    default: ''
  },
  phone: {
    type: String,
    default: ''
  },
  admin: {
    type: Boolean,
    default: false
  },
  role: {
    type: String,
    enum: ['intern', 'memberAdmin', 'spotAdmin', 'cashAdmin', 'stockAdmin', 'admin'],
    default: 'intern'
  }
});

// User.methods.getName = function () {
//   return (this.firstname + ' ' + this.lastname);
// };

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
